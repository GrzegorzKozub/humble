defmodule Solver do
  def fib(scheduler) do
    send(scheduler, {:ready, self()})

    receive do
      {:fib, n, client} ->
        send(client, {:answer, n, calc(n), self()})
        fib(scheduler)

      {:shutdown} ->
        exit(:normal)
    end
  end

  def calc(0), do: 0
  def calc(1), do: 1
  def calc(n), do: calc(n - 1) + calc(n - 2)
end
