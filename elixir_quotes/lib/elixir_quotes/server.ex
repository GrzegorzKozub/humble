defmodule ElixirQuotes.Server do
  @moduledoc """
  Just for demo following the course. Not needed when we have the Scheduler.
  """

  use GenServer

  def start_link() do
    GenServer.start_link(__MODULE__, :ok, name: :quote_server)
  end

  def init(:ok) do
    {:ok, %{}}
  end

  def handle_cast({:file_path, file_path}, _) do
    ElixirQuotes.Quotes.show(file_path)
    {:noreply, %{}}
  end

  def quote(file_path) do
    GenServer.cast(:quote_server, {:file_path, file_path})
  end
end
