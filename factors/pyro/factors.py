import pyro.distributions as dist

"""
Wraps Pyro distributions
"""

def Bernoulli(_name, p):
    return {'x': pyro.sample(_name, dist.Bernoulli(p)) }

def BernoulliLogit(_name, l):
    return {'x': pyro.sample(_name, dist.Bernoulli(logits=l)) }

def Beta(_name, c1, c2):
    return {'x': pyro.sample(_name, dist.Beta(c1, c2)) }

def Categorical(_name, p):
    return {'c': pyro.sample(_name, dist.Categorical(p)) }

def CategoricalLogit(_name, p):
    return {'c': pyro.sample(_name, dist.Categorical(logits=l)) }

def Cauchy(_name, loc, scale):
    return {'x': pyro.sample(_name, dist.Cauchy(loc, scale)) }

def ChiSq(_name, df): 
    return {'x': pyro.sample(_name, dist.Chi2(df)) }

def Dirichlet(_name, c):
    return {'x': pyro.sample(_name, dist.Dirichlet(c)) }

def Exponential(_name, rate):
    return {'x': pyro.sample(_name, dist.Exponential(rate)) }

def FisherSnedecor(df1, df2):
    return {'f': pyro.sample(_name, dist.FisherSnedecor(df1, df2)) }

def Gamma(_name, concentration, rate):
    return {'x': pyro.sample(_name, dist.Gamma(concentration, rate)) }

def Geometric(_name, p):
    return {'x': pyro.sample(_name, dist.Geometric(probs=p)) }

def GeometricLogit(_name, l):
    return {'x': pyro.sample(_name, dist.Geometric(logits=l)) }

def Gumbel(_name, loc, scale):
    return {'x': pyro.sample(_name, dist.Gumbel(loc, scale)) }

def Laplace(_name, loc, scale):
    return {'x': pyro.sample(_name, dist.Laplace(loc, scale)) }

def LogisticNormal(_name, loc, scale):
    return {'x': pyro.sample(_name, dist.LogisticNormal(loc, scale)) }

def LogNormal(_name, loc, scale):
    return {'x': pyro.sample(_name, dist.LogNormal(loc, scale)) }

def Multinomial(_name, n, p):
    return {'x': pyro.sample(_name, dist.Multinomial(n, p)) }

def MultinomialLogit(_name, n, l):
    return {'x': pyro.sample(_name, dist.Multinomial(n, logits=l)) }

def MultivariateNormal(_name, loc, cov_mat):
    return {'z': pyro.sample(_name, dist.MultivariateNormal(loc, cov_mat)) }

def MultivariateNormalPrecision(_name, loc, prec_mat):
    return {'z': pyro.sample(_name, dist.MultivariateNormal(loc, precision_matrix=prec_mat)) }

def Normal(_name, mu, sigma):
    return {'z': pyro.sample(_name, dist.Normal(mu, sigma)) }

def OneHotCategorical(_name, p):
    return {'x': pyro.sample(_name, dist.OneHotCategorical(probs)) }

def OneHotCategoricalLogit(_name, l):
    return {'x': pyro.sample(_name, dist.OneHotCategorical(logits=l)) }

def Pareto(_name, scale, alpha):
    return {'x': pyro.sample(_name, dist.Pareto(scale, alpha)) }

def Poisson(_name, rate):
    return {'x': pyro.sample(_name, dist.Poisson(rate)) }

def RelaxedBernoulli(_name, t, p):
    return {'x': pyro.sample(_name, dist.RelaxedBernoulli(t, p)) }

def RelaxedBernoulliLogits(_name, temp, l):
    return {'x': pyro.sample(_name, dist.RelaxedBernoulli(t, logits=l)) }

def RelaxedOneHotCategorical(_name, temp, p):
    return {'x': pyro.sample(_name, dist.RelaxedOneHotCategorical(t, p)) }

def RelaxedOneHotCategoricalLogit(_name, temp, l):
    return {'x': pyro.sample(_name, dist.RelaxedOneHotCategorical(t, logits=l)) }

def StudentT(_name, df, loc, scale):
    return {'x': pyro.sample(_name, dist.StudentT(df, loc, scale)) }

def Uniform(_name, low, high):
    return {'x': pyro.sample(_name, dist.uniform(low, high)) } 
