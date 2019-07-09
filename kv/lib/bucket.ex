defmodule KV.Bucket do
  use Agent

  def start_link(_opts) do
    Agent.start_link(fn -> %{} end)
  end

  def get(bucket, key) do
    Agent.get(bucket, &Map.get(&1, key))
  end

  #def put(bucket, key, value) do
    #Agent.update(bucket, &Map.put(&1, key, value))
  #end

  def put(bucket, key, value) do
    # client
    Agent.update(bucket, fn state ->
      # server
      Map.put(state, key, value)
    end)
    # client
  end

  def delete(bucket, key) do
    # put client to sleep
    Process.sleep(250)

    Agent.get_and_update(bucket, fn dict ->
      # put server to sleep
      Process.sleep(250)
      Map.pop(dict, key)
    end)
  end
end
