import LazyLoad from 'vanilla-lazyload';

const lazyLoadOptions = {
  elements_selector: '.simply-lazy',
  threshold: 0,
}

export default () => { return new LazyLoad(lazyLoadOptions) }
