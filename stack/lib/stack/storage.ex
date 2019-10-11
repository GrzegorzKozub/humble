defmodule Stack.Storage do
  use GenServer
  @me __MODULE__

  # client

  def start_link(state) do
    GenServer.start_link(@me, state, name: @me)
  end

  def get_all, do: GenServer.call(@me, :get_all)

  def replace_all(new_state) do
    GenServer.cast(@me, {:replace_all, new_state})
  end

  # server

  def init(state), do: {:ok, state}

  def handle_call(:get_all, _from, state) do
    {:reply, state, state}
  end

  def handle_cast({:replace_all, new_state}, _from, _state) do
    {:noreply, new_state}
  end
end
