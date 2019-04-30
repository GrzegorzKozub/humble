defmodule Elxr do
  @doc """
  ## Examples

      iex> Elxr.short1(:one)
      1

      iex> Elxr.short1(:four)
      0

  """
  def short1(num) do
    cond do
      num == :one -> 1
      num == :two -> 2
      num == :three -> 3
      true -> 0
    end
  end

  @doc """
  ## Examples

      iex> Elxr.short2(:two)
      2

  """
  def short2(:one), do: 1
  def short2(:two), do: 2
  def short2(:three), do: 3
  def short2(_), do: 0

  @doc """
  ## Examples

      iex> Elxr.short3(:three)
      3

  """
  def short3(num) do
    case num do
      :one -> 1
      :two -> 2
      :three -> 3
      _ -> 0
    end
  end

  def xmas(date) do
    case date do
      {25, 12, _} -> 'merry xmas'
      {25, month, _} -> 'only #{12 - month} month(s) to xmas'
      {_, month, _} when month == 12 -> 'xmas is this month'
      {_, _, _} -> 'ordinary day'
    end
  end

  def map([], _), do: []
  def map([hd | tl], f), do: [f.(hd) | map(tl, f)]

  defp fizz_buzz_impl(0, 0, _), do: 'FizzBuzz'
  defp fizz_buzz_impl(0, _, _), do: 'Fizz'
  defp fizz_buzz_impl(_, 0, _), do: 'Buzz'
  defp fizz_buzz_impl(_, _, a), do: a

  def fizz_buzz(n) do
    fizz_buzz_impl(rem(n, 3), rem(n, 5), n)
  end
end
