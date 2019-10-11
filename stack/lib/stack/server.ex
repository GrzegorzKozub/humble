defmodule Stack.Server do
  use GenServer
  @me __MODULE__

  # client

  def start_link(_) do
    GenServer.start_link(@me, nil, name: @me)
  end

  def pop, do: GenServer.call(@me, :pop)
  def push(item), do: GenServer.cast(@me, {:push, item})

  # server

  def init(_), do: {:ok, Stack.Storage.get_all()}
  def terminate(_reason, list), do: Stack.Storage.replace_all(list)

  def handle_call(:pop, _from, list) do
    if length(list) == 0, do: raise("Stack is empty")
    # TODO: is this really a stack?
    {item, list} = List.pop_at(list, 0)
    {:reply, item, list}
  end

  def handle_cast({:push, item}, list) do
    # TODO: slow!
    {:noreply, list ++ [item]}
  end
end
