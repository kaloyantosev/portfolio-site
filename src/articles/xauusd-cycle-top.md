## 1. Background

Between late 2025 and January 2026, gold went almost straight up. It cleared every previous high and pushed through $5,500 an ounce. Calling the end of a move like that is hard, and trying to do it on instinct is usually expensive. I wanted something more structured, so I combined three things: statistical channels, positioning and leverage data, and the mood of the market.

The core of it was three linear regression channels drawn over very different time spans – decades, years and months. On January 29, 2026, all three were stretched to their upper limits at roughly the same price. I posted the analysis on Threads that day, while gold was still trading near the high, so there would be a dated record rather than a story told afterwards.

## 2. What a Regression Channel Shows

A linear regression channel is a way of measuring a trend without drawing it by hand. Instead of choosing which highs and lows to connect, you fit a line through all the closing prices using least squares.

It has two parts:

- The centre line: the best-fit line through every close in the period. You can think of it as the trend's fair value over that window.
- The outer bands: lines set a fixed distance above and below the centre, usually two standard deviations. If prices were normally distributed, about 95% of them would sit inside these bands.

Price inside the channel is ordinary behaviour. Price at or above the upper band means the market has moved well ahead of its own trend. Strong momentum can keep it there for a while, but not for long, and the usual outcome is a move back towards the middle.

## 3. The Three Channels

I drew all three on the monthly chart, each starting from a meaningful point in gold's recent history:

1. The long-term channel, from 1998: this starts near the start of reliable electronic spot data, when gold was around $251.70. It covers almost 30 years of the bull market, so a touch of its upper band is rare.
2. The cycle channel, from 2021: this starts at the low after the 2020 consolidation and covers the inflation-driven cycle – rising prices, central-bank buying and safe-haven demand.
3. The short-term channel, from early 2025: this covers roughly the year before the call, when the rally turned close to vertical and retail interest surged.

Any one of these on its own can give a false signal. What made the setup worth acting on was that the upper bands of all three landed in the same area, between $5,400 and $5,600. Three unrelated time frames agreeing that price was stretched made a reversal much more likely than any single signal would.

[[chart:gold-channels]]

## 4. Putting It on Record

It is easy to say you saw a top once the price has already fallen. I wanted to commit before that happened, so I posted the analysis on Threads (@ktsvv_) on January 29, 2026.

I kept the post simple and gave it a clear condition: "A candle close below $5,400 and that is it for the Gold run on this cycle. Finally at the top. Officially calling it now." Writing it down before the monthly close gave both a trigger and a point at which I would be wrong.

## 5. Leverage

A chart pattern needs context. In the final leg up in late January, speculative leverage in gold had become extreme.

Coverage from Bloomberg and Reuters, and research referenced by the Bank for International Settlements, described a sharp rise in borrowing to buy gold exposure. Brokers reported record margin balances, traders piled into micro-futures and short-dated call options, speculative net longs on COMEX were at record levels, and gold ETFs traded above their net asset value because demand was so one-sided.

Leverage helps on the way up and hurts on the way down. When a rally runs on borrowed money, a small stall is enough to start trouble: brokers raise margin requirements, overextended traders get margin calls, forced selling triggers stops, and lower prices produce more margin calls. Knowing how much leverage was in the market made me more confident that a move from the top of the channels would be fast.

## 6. Sentiment

The last piece was sentiment. Markets rarely peak while people are still cautious. They tend to peak when caution has disappeared.

By January 2026, the mood around gold was almost entirely one-way. Gold was on front pages that rarely mention commodities. Social media was full of targets of $7,000, $8,000 and even $10,000. People who had never bought gold before were opening accounts to buy near the highs.

Anyone suggesting profit-taking was waved away. That is what late-stage euphoria tends to look like: once nearly everyone who wants to own the asset already owns it, often with borrowed money, there are few buyers left. That gave me the confidence to take the other side.

## 7. Conclusion

The call on January 29, 2026, rested on three things:

1. The channels: the upper bands of the 28-year, 5-year and 1-year channels meeting between $5,400 and $5,600.
2. Fragile positioning: record margin debt, heavy futures open interest and aggressive call buying, which left the market exposed to forced selling.
3. Sentiment: broad euphoria, retail FOMO and near-universal expectations of higher prices.

Putting statistics, positioning and sentiment together, and publishing the view before the outcome was known, is the approach I try to follow with every analysis.

## 8. From Analysis to Indicator

Reading several regression channels over different time spans and looking for where their bands meet led me to build the Dynamic Regression Channels indicator. It does the same thing automatically: it fits channels over four horizons, sizes each band by the actual scatter around its trend, and marks the price zones where several horizons line up.
