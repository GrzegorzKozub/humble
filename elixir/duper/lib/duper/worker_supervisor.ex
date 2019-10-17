defmodule Duper.WorkerSupervisor do
  use DynamicSupervisor
  @me WorkerSupervisor

  # api

  def start_link(_) do
    DynamicSupervisor.start_link(__MODULE__, :no_args, name: @me)
  end

  def add_worker() do
    {:ok, _pid} = DynamicSupervisor.start_child(@me, Duper.Worker)
  end

  # server

  def init(:no_args) do
    DynamicSupervisor.init(strategy: :one_for_one)
  end
end
