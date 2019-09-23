defmodule FredAndBetty do
  def proc(pid) do
    receive do
      msg ->
        send(pid, msg)
    end
  end

  def receive do
    receive do
      msg ->
        IO.puts(msg)
        receive()
    after
      1000 -> IO.puts("done")
    end
  end

  def run do
    fred_pid = spawn(FredAndBetty, :proc, [self()])
    betty_pid = spawn(FredAndBetty, :proc, [self()])
    send(fred_pid, "fred")
    send(betty_pid, "betty")
    receive()
  end
end
