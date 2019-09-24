defmodule FibonacciServerTest do
  use ExUnit.Case
  doctest FibonacciServer

  test "greets the world" do
    assert FibonacciServer.hello() == :world
  end
end
