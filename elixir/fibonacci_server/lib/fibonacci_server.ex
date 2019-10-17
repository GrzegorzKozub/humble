defmodule FibonacciServer do
  def start do
    to_process = List.duplicate(37, 3)

    Enum.each(1..5, fn num_processes ->
      {time, result} =
        :timer.tc(
          Scheduler,
          :run,
          [num_processes, Solver, :fib, to_process]
        )

      if num_processes == 1 do
        IO.puts(inspect(result))
        IO.puts("\n # time(s)")
      end

      :io.format("~2B    ~.2f~n", [num_processes, time / 1_000_000])
    end)
  end
end
