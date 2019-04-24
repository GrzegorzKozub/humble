defmodule ElxrTest do
  use ExUnit.Case
  doctest Elxr

  test "xmas" do
    assert Elxr.xmas({4, 5, 2019}) == 'ordinary day'
    assert Elxr.xmas({25, 5, 2019}) == 'only 7 month(s) to xmas'
    assert Elxr.xmas({25, 12, 2019}) == 'merry xmas'
    assert Elxr.xmas({7, 12, 2019}) == 'xmas is this month'
  end

  test "map" do
    assert Elxr.map([1, 2, 3], fn a -> a * 2 end) == [2, 4, 6]
    assert Elxr.map([1, 2, 3], &(&1 + 3)) == [4, 5, 6]
  end
end
