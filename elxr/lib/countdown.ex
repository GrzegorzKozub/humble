defmodule Countdown do
  defp sleep(seconds) do
    receive do
    after
      seconds * 1_000 -> nil
    end
  end

  def say(text) do
    case :os.type() do
      {:unix, _} -> spawn(fn -> :os.cmd('espeak #{text}') end)
      {:win32, _} -> IO.puts(text)
    end
  end

  def timer do
    Stream.resource(
      fn ->
        {_h, _m, s} = :erlang.time()
        60 - s - 1
      end,
      fn
        0 ->
          {:halt, 0}

        count ->
          sleep(1)
          {[inspect(count)], count - 1}
      end,
      fn _ -> nil end
    )
  end
end
