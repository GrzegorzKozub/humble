defmodule KV.BucketTest do
  use ExUnit.Case, async: true
  alias KV.Bucket

  setup do
    bucket = start_supervised!(Bucket)
    %{bucket: bucket}
  end

  test "stores value by key", %{bucket: bucket} do
    assert Bucket.get(bucket, "milk") == nil
    Bucket.put(bucket, "milk", 3)
    assert Bucket.get(bucket, "milk") == 3
  end

  test "deletes value by key", %{bucket: bucket} do
    Bucket.put(bucket, "milk", 3)
    assert Bucket.delete(bucket, "milk") == 3
    assert Bucket.get(bucket, "milk") == nil
  end
end
