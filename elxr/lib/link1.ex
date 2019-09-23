defmodule Link1 do
  import :timer, only: [sleep: 1]

  def sad_function do
    sleep(500)
    exit(:boom)
  end

  def run do
    # the exit is not reported
    # spawn(Link1, :sad_function, [])

    # the exit is reported
    # Process.flag(:trap_exit, true)
    # spawn_link(Link1, :sad_function, [])

    # with monitoring
    res = spawn_monitor(Link1, :sad_function, [])
    IO.puts(inspect(res))

    receive do
      msg -> IO.puts("msg: #{inspect(msg)}")
    after
      1000 -> IO.puts("nothing happened")
    end
  end
end
