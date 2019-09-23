defmodule SleepSendExit do
  import :timer, only: [sleep: 1]

  def sad_function(pid) do
    send(pid, "i'll exit now")
    # exit(:boom)
    throw(:boom)
  end

  def run do
    res = spawn_monitor(SleepSendExit, :sad_function, [self()])
    IO.puts(inspect(res))

    sleep(2000)

    receive do
      msg -> IO.puts("msg: #{inspect(msg)}")
    after
      5000 -> IO.puts("nothing happened")
    end
  end
end
