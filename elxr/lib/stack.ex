defmodule Stack do
  use GenServer

  # client
  def start_link(default) when is_list(default), do: GenServer.start_link(__MODULE__, default)
  def push(pid, element), do: GenServer.cast(pid, {:push, element})
  def pop(pid), do: GenServer.call(pid, :pop)

  # server

  @impl true
  def init(stack), do: {:ok, stack}

  @impl true
  def handle_call(:pop, _from, [head | tail]), do: {:reply, head, tail}

  @impl true
  def handle_cast({:push, element}, state), do: {:noreply, [element | state]}
end
