defmodule ListsAndRecursion do
  def mapsum([], _func), do: 0

  def mapsum([head | tail], func) do
    func.(head) + mapsum(tail, func)
  end

  def maxim([head | tail]), do: maxim(tail, head)
  def maxim([], curr), do: curr

  def maxim([head | tail], curr) when curr >= head do
    maxim(tail, curr)
  end

  def maxim([head | tail], curr) when curr < head do
    maxim(tail, head)
  end

  def caesar([], _a), do: []

  def caesar([head | tail], a) when head + a > ?z do
    [head + a - (?z - ?a + 1) | caesar(tail, a)]
  end

  def caesar([head | tail], a) do
    [head + a | caesar(tail, a)]
  end

  def all?(list), do: all?(list, fn item -> !!item end)

  def all?([], _func), do: true

  def all?([head | tail], func) do
    if func.(head) do
      all?(tail, func)
    else
      false
    end
  end

  def each([], _func), do: :ok

  def each([head | tail], func) do
    func.(head)
    each(tail, func)
  end

  def each(item, func), do: func.(item)

  def filter([], _func), do: []

  def filter([head | tail], func) do
    if func.(head) do
      [head | filter(tail, func)]
    else
      filter(tail, func)
    end
  end

  def split(list, count), do: _split(list, [], count)
  defp _split([], front, _), do: [Enum.reverse(front), []]
  defp _split(tail, front, 0), do: [Enum.reverse(front), tail]
  defp _split([head | tail], front, count), do: _split(tail, [head | front], count - 1)

  def take(list, count), do: hd(split(list, count))
end
