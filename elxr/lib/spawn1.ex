# server

defmodule Spawn1 do
  def greet do
    receive do
      {server, msg} ->
        send(server, {:ok, "hello, #{msg}"})
        greet()
    end
  end
end

# client

pid = spawn(Spawn1, :greet, [])

send(pid, {self(), "world"})

receive do
  {:ok, msg} ->
    IO.puts(msg)
end

send(pid, {self(), "Kermit!"})

receive do
  {:ok, message} ->
    IO.puts(message)
after
  500 ->
    IO.puts("the greeter has gone away")
end
