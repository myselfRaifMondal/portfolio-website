// Research notes. Each claim here is limited to what the linked public repository actually contains.

export type Block = { p: string } | { h: string } | { pull: string } | { figure: 'pricer' | 'sizer' };

export type Note = {
  slug: string;
  no: string;
  kicker: string;
  title: string;
  dek: string;
  repo?: string;
  body: Block[];
};

export const NOTES: Note[] = [
  {
    slug: 'can-a-network-learn-black-scholes',
    no: 'I',
    kicker: 'Derivatives · Machine learning',
    title: 'Can a network learn Black-Scholes?',
    dek: 'Teaching a model a formula we already know, to find out what it can and cannot be trusted with.',
    repo: 'Derivative-Pricing',
    body: [
      { p: 'Black-Scholes is the rare thing in finance with a closed form. Give it a spot price, a strike, a volatility, a rate and a time, and it hands back the fair price of a European option. That makes it a useful test: if a neural network cannot learn a function we can already write down, it has no business pricing the ones we cannot.' },
      { p: 'The exercise is adapted from the derivative-pricing case study in Machine Learning and Data Science Blueprints for Finance. I generated ten thousand synthetic options, with moneyness drawn around one and time to expiry between zero and a year, priced each one with the closed form under a simple volatility surface that rises with time and with distance from the money, and asked a multi-layer perceptron to learn the mapping back.' },
      { figure: 'pricer' },
      { h: 'What the exercise is really testing' },
      { p: 'Play with the pricer above and the shape the network has to learn becomes clear. Far out of the money the price is nearly flat; near the strike it bends sharply; as expiry approaches the bend tightens into a corner. A model can fit the smooth middle well and still be wrong exactly where the risk lives.' },
      { pull: 'A model that is right on average and wrong at the strike is wrong where it matters.' },
      { p: 'So the honest way to read a result like this is not the overall error but the error near the money and near expiry, and how the model’s implied Greeks compare with the real ones. That is the next step for this work: the repository trains and tunes the network with cross-validation, but it does not yet measure error by region or check the Greeks.' },
    ],
  },
  {
    slug: 'turning-credit-scores-into-ratings',
    no: 'II',
    kicker: 'Credit risk · Job simulation',
    title: 'Turning credit scores into ratings',
    dek: 'Where to draw the lines between FICO buckets, if the goal is to separate borrowers who default from those who do not.',
    repo: 'JP-Morgan-Quant-Projects',
    body: [
      { p: 'This came out of the JPMorgan Chase quantitative research job simulation on Forage. It is a set of practice tasks, not work done at JPMorgan, and I want to be plain about that. Of the four tasks, the one that stayed with me was the last: turning a continuous credit score into a small number of ratings.' },
      { p: 'A bank that wants to model default by rating, rather than by raw score, has to decide where the buckets begin and end. The lazy answer is equal-sized buckets. It is easy to explain and almost certainly wrong, because default risk does not change evenly across the score range.' },
      { h: 'Letting the defaults choose the boundaries' },
      { p: 'The better answer is to choose boundaries that make the observed defaults most likely. Inside each bucket, defaults are treated as a binomial outcome with the bucket’s own default rate; the boundaries are then moved to maximise the total log-likelihood. The ratings that come out are the ones that best separate good borrowers from bad.' },
      { pull: 'Equal buckets are easy to explain. Likelihood buckets are easy to defend.' },
      { p: 'The other tasks in the same repository price a natural gas storage contract from injection and withdrawal cash flows, forecast gas prices with Holt-Winters, and estimate expected loss from a logistic-regression probability of default. The code is a first pass: the optimiser still has a known indexing bug, and the scripts expect file names that differ from the data in the repository. I have left it as it was, warts and all.' },
    ],
  },
  {
    slug: 'twenty-three-years-of-balance-sheets',
    no: 'III',
    kicker: 'Data engineering · Indian equities',
    title: 'Twenty-three years of balance sheets',
    dek: 'Building a fundamentals dataset for Indian companies, one polite request at a time.',
    repo: 'Fundamental-Financial-Data-Scrapper',
    body: [
      { p: 'Most quantitative ideas die on data before they die on maths. For Indian equities, clean and free fundamental data is hard to come by, so I wrote a scraper that walks the list of BSE-listed companies and collects each one’s balance sheet.' },
      { p: 'It asks for consolidated statements first and falls back to standalone ones, retries with backoff when a request fails, and waits fifteen to twenty seconds between companies so as not to hammer the source. The result is a table of a little over sixteen thousand rows covering roughly 1,580 companies, with reporting periods from 2002 to 2025.' },
      { h: 'The part nobody puts in the chart' },
      { p: 'Of the tickers I tried in one run, about as many failed as succeeded. Delisted names, renamed companies, missing consolidated filings and pages that changed shape all show up as gaps. A model trained on the survivors would quietly learn from the companies that lasted long enough to be scraped.' },
      { pull: 'The missing rows are data too. They are just the expensive kind.' },
      { p: 'The repository stops at collection; there is no analysis on top of it yet. The lesson I took is the boring one: before a single feature is engineered, know exactly which companies are missing and why.' },
    ],
  },
  {
    slug: 'paper-fills-flatter-you',
    no: 'IV',
    kicker: 'Execution · Risk',
    title: 'Paper fills flatter you',
    dek: 'Why a paper-trading engine should make you pay spread, slippage and margin, even when no money is at stake.',
    repo: 'IndiPaperTrade',
    body: [
      { p: 'Most paper-trading tools fill every order at the last price, instantly and in full. That is the most generous counterparty in the world, and it teaches the wrong habits. IndiPaperTrade is my attempt at a less flattering one for Indian equities.' },
      { p: 'It listens to live NSE prices from Angel One’s market feed and simulates the parts of execution that cost money: market, limit, stop-loss and bracket orders; partial fills; spread and slippage; margin and leverage. A risk layer tracks drawdown, win rate, profit factor and an annualised Sharpe ratio, and stops trading for the day after a three per cent loss.' },
      { h: 'Sizing is the part you control' },
      { p: 'The figure below is not from the engine and not a track record. It is a plain simulation of one modest strategy over three years of random days. Move only the position size and watch what happens to the worst drawdown.' },
      { figure: 'sizer' },
      { p: 'Past a certain size, a bigger position stops adding return and only adds pain. That is why the daily loss limit sits in the engine rather than in my head: a rule enforced by code does not negotiate on a bad afternoon.' },
      { pull: 'A rule you break once is only a suggestion.' },
      { p: 'The codebase is large and still being tidied; some modules are duplicated and it has not yet logged a real trading history. It is a working tool, not a result.' },
    ],
  },
];
