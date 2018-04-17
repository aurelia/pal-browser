<a name="1.8.0"></a>
# [1.8.0](https://github.com/aurelia/pal-browser/compare/1.7.0...1.8.0) (2018-04-17)

### Features

* Updated to support new PAL methods and typings.

<a name="1.7.0"></a>
# [1.7.0](https://github.com/aurelia/pal-browser/compare/1.6.0...v1.7.0) (2018-03-06)


### Features

* **performance:** performance api update ([#32](https://github.com/aurelia/pal-browser/issues/32)) ([b1b488f](https://github.com/aurelia/pal-browser/commit/b1b488f))



<a name="1.6.0"></a>
# [1.6.0](https://github.com/aurelia/pal-browser/compare/1.4.0...v1.6.0) (2018-03-03)


### Features

* **dom:** add NodeList to global ([#31](https://github.com/aurelia/pal-browser/issues/31)) ([16cd315](https://github.com/aurelia/pal-browser/commit/16cd315))



<a name="1.4.0"></a>
# [1.4.0](https://github.com/aurelia/pal-browser/compare/1.3.1...v1.4.0) (2018-01-27)

### Features

* **dom**: Enable injectStyles to replace the contents of an existing style element by id.

<a name="1.3.1"></a>
## [1.3.1](https://github.com/aurelia/pal-browser/compare/1.3.0...v1.3.1) (2017-12-20)


### Bug Fixes

* **html-template-element:** fix unable to get property querySelectorAll error when using webcomponents-lite in IE11 ([#27](https://github.com/aurelia/pal-browser/issues/27)) ([9e4b62f](https://github.com/aurelia/pal-browser/commit/9e4b62f))



<a name="1.3.0"></a>
# [1.3.0](https://github.com/aurelia/pal-browser/compare/1.2.1...v1.3.0) (2017-08-22)


### Features

* **dom:** add createAttribute function ([#21](https://github.com/aurelia/pal-browser/issues/21)) ([6759618](https://github.com/aurelia/pal-browser/commit/6759618))
* **dom:** add createTemplateElement ([a04ca40](https://github.com/aurelia/pal-browser/commit/a04ca40))



<a name="1.2.1"></a>
## [1.2.1](https://github.com/aurelia/pal-browser/compare/1.2.0...v1.2.1) (2017-04-05)


### Bug Fixes

* **pal-browser:** regression in Function.name polyfill on iOS ([#20](https://github.com/aurelia/pal-browser/issues/20)) ([17d2eb7](https://github.com/aurelia/pal-browser/commit/17d2eb7))



<a name="1.2.0"></a>
# [1.2.0](https://github.com/aurelia/pal-browser/compare/1.1.0...v1.2.0) (2017-03-23)

### Features

* add flag to opt-out of IE support

<a name="1.1.0"></a>
# [1.1.0](https://github.com/aurelia/pal-browser/compare/1.0.0...v1.1.0) (2016-12-07)


### Features

* **index:** move isInitialized to aurelia-pal ([#14](https://github.com/aurelia/pal-browser/issues/14)) ([13c3b77](https://github.com/aurelia/pal-browser/commit/13c3b77))



<a name="1.0.0"></a>
# [1.0.0](https://github.com/aurelia/pal-browser/compare/1.0.0-rc.1.0.1...v1.0.0) (2016-07-27)


### Bug Fixes

* **polyfill:** assign PLATFORM.performance ([099d951](https://github.com/aurelia/pal-browser/commit/099d951)), closes [aurelia/pal-browser#6](https://github.com/aurelia/pal-browser/issues/6)


### Performance Improvements

* **polyfill:** remove Date.now polyfill ([#8](https://github.com/aurelia/pal-browser/issues/8)) ([27b1fb7](https://github.com/aurelia/pal-browser/commit/27b1fb7))



<a name="1.0.0-rc.1.0.1"></a>
# [1.0.0-rc.1.0.1](https://github.com/aurelia/pal-browser/compare/1.0.0-rc.1.0.0...v1.0.0-rc.1.0.1) (2016-07-12)


### Bug Fixes

* **dom:** only use parentNode is provided ([eff0211](https://github.com/aurelia/pal-browser/commit/eff0211))



<a name="1.0.0-rc.1.0.0"></a>
# [1.0.0-rc.1.0.0](https://github.com/aurelia/pal-browser/compare/1.0.0-beta.3.0.1...v1.0.0-rc.1.0.0) (2016-06-22)



### 1.0.0-beta.2.0.1 (2016-05-24)


#### Features

* **console:** add console fixes ([087faa34](http://github.com/aurelia/pal-browser/commit/087faa341972105a4220239e85b5b701fa605dee))


### 1.0.0-beta.2.0.0 (2016-05-23)


#### Features

* **feature:** Implement Shadow DOM v1 Check (#4) ([4f9ba7e2](http://github.com/aurelia/pal-browser/commit/4f9ba7e21ee491c9619566995e20bfe80ac0a42c))


### 1.0.0-beta.1.2.1 (2016-05-10)


### 1.0.0-beta.1.2.0 (2016-03-22)


* Update to Babel 6


### 1.0.0-beta.1.1.4 (2016-03-01)


#### Bug Fixes

* **all:** remove core-js ([7eb2303d](http://github.com/aurelia/pal-browser/commit/7eb2303de6b066aa051906b9959d6b96b2e1e09e))


### 1.0.0-beta.1.1.3 (2016-02-08)


#### Bug Fixes

* **dom:** mark optional parameters ([7355b4ae](http://github.com/aurelia/pal-browser/commit/7355b4aeb3249187c79f2ab1aece44679632fbab))


## 1.0.0-beta.1.1.2 (2016-01-28)

* fix package metadata for jspm

## 1.0.0-beta.1.1.0 (2016-01-28)


#### Bug Fixes

* **index:** add core-js import ([162cfbf3](http://github.com/aurelia/pal-browser/commit/162cfbf3208b0123a9860f4a3b2dbfd4559d9b40), closes [#2](http://github.com/aurelia/pal-browser/issues/2))


#### Features

* **all:** update for jspm; update core-js and aurelia deps ([9d870d29](http://github.com/aurelia/pal-browser/commit/9d870d2948ba93706fce9053c979bf8ebe5a5b0b))
* **feature:** add mutation observer feature detection ([3add002e](http://github.com/aurelia/pal-browser/commit/3add002e5531401cf7e97f46d411225c6ad9621e))


### 1.0.0-beta.1.0.3 (2016-01-08)


### 1.0.0-beta.1.0.2 (2016-01-08)


#### Bug Fixes

* **feature:** remove Obect/Array observe detection ([ecf35855](http://github.com/aurelia/pal-browser/commit/ecf358551a7958a6996fb78d2e604356a536bf30))
* **package:** add missing core-js dependency ([08ab345a](http://github.com/aurelia/pal-browser/commit/08ab345af92d9ba8ddf2ba324a926e2e689c3adf))


### 1.0.0-beta.1.0.1 (2015-12-16)


#### Features

* **PAL:** requestAnimationFrame and performance APIs ([8427b1f2](http://github.com/aurelia/pal-browser/commit/8427b1f26c93033973cdfb91c4ec0c57ccf7326c))
* **performance:** performance API polyfill ([9b706b38](http://github.com/aurelia/pal-browser/commit/9b706b38296a586f7716ae433ec8b603bc678b5e))


### 1.0.0-beta.1 (2015-11-15)


## 0.3.0 (2015-11-09)


## 0.2.0 (2015-10-13)


#### Bug Fixes

* **all:**
  * ensure initialization happens only once ([b594bcea](http://github.com/aurelia/pal-browser/commit/b594bcea7d26930cb8bf3459344602b060ea4379))
  * update to new initialization method and add DOM title prop ([abc46c93](http://github.com/aurelia/pal-browser/commit/abc46c93d7cf750ec2d05d142373c8dcede6db90))
  * correct type info ([bd43eb17](http://github.com/aurelia/pal-browser/commit/bd43eb175b328f372698a45e53fef25302800b63))
  * make polfill patches explicit ([a9a8c84c](http://github.com/aurelia/pal-browser/commit/a9a8c84ce6b3f221f5f673b9441523fd855d7c4a))
* **html-template-element:** correctly handle child templates ([a6961f33](http://github.com/aurelia/pal-browser/commit/a6961f33bf6fae7f8cdaeb235e5f5aca33aff5fe))
* **initialize:** use correct platform object for global access ([e7493568](http://github.com/aurelia/pal-browser/commit/e7493568e39c253e177d5dac9a36c62eda6a251c))
* **package:** correct main path ([142415ac](http://github.com/aurelia/pal-browser/commit/142415ac43097efcfb9abc9c9c325ce1e35b275e))
* **platform:**
  * incorrect platform reference ([cef7ba8b](http://github.com/aurelia/pal-browser/commit/cef7ba8b5c4b8be9d6bb917913672c9aa108e652))
  * remove bad module iteration method ([3529b983](http://github.com/aurelia/pal-browser/commit/3529b9832c139ef77f2c755d0b0ad37e599ba8f1))


#### Features

* **all:**
  * add activeElement and scopedCSS ([02bd5924](http://github.com/aurelia/pal-browser/commit/02bd59241823f87286c481e842508ca67ba0854d))
  * correct missing properties on pal objects ([5da8ba3b](http://github.com/aurelia/pal-browser/commit/5da8ba3bded4aa9021bc5b5feaea3070933a7acb))
  * add dom and platform event apis ([613d516d](http://github.com/aurelia/pal-browser/commit/613d516d1fde0e193a2387134d1f1f4c131688f5))
  * initial implementation ([b9aacd06](http://github.com/aurelia/pal-browser/commit/b9aacd0620ca51f8648115220793f4df5ce030ac))


### 0.1.13 (2015-10-09)


#### Features

* **all:** add activeElement and scopedCSS ([02bd5924](http://github.com/aurelia/pal-browser/commit/02bd59241823f87286c481e842508ca67ba0854d))


### 0.1.12 (2015-10-04)


### 0.1.11 (2015-10-02)


#### Bug Fixes

* **initialize:** use correct platform object for global access ([e7493568](http://github.com/aurelia/pal-browser/commit/e7493568e39c253e177d5dac9a36c62eda6a251c))


### 0.1.10 (2015-10-02)


#### Features

* **all:** correct missing properties on pal objects ([5da8ba3b](http://github.com/aurelia/pal-browser/commit/5da8ba3bded4aa9021bc5b5feaea3070933a7acb))


### 0.1.9 (2015-10-02)


#### Bug Fixes

* **all:** ensure initialization happens only once ([b594bcea](http://github.com/aurelia/pal-browser/commit/b594bcea7d26930cb8bf3459344602b060ea4379))


### 0.1.8 (2015-10-02)


### 0.1.7 (2015-10-02)


#### Bug Fixes

* **all:** update to new initialization method and add DOM title prop ([abc46c93](http://github.com/aurelia/pal-browser/commit/abc46c93d7cf750ec2d05d142373c8dcede6db90))


### 0.1.6 (2015-10-02)


#### Features

* **all:** add dom and platform event apis ([613d516d](http://github.com/aurelia/pal-browser/commit/613d516d1fde0e193a2387134d1f1f4c131688f5))


### 0.1.5 (2015-10-01)


#### Bug Fixes

* **all:**
  * correct type info ([bd43eb17](http://github.com/aurelia/pal-browser/commit/bd43eb175b328f372698a45e53fef25302800b63))
  * make polfill patches explicit ([a9a8c84c](http://github.com/aurelia/pal-browser/commit/a9a8c84ce6b3f221f5f673b9441523fd855d7c4a))


### 0.1.4 (2015-10-01)


#### Bug Fixes

* **html-template-element:** correctly handle child templates ([a6961f33](http://github.com/aurelia/pal-browser/commit/a6961f33bf6fae7f8cdaeb235e5f5aca33aff5fe))


### 0.1.3 (2015-09-27)


### 0.1.2 (2015-09-27)


#### Bug Fixes

* **platform:** remove bad module iteration method ([3529b983](http://github.com/aurelia/pal-browser/commit/3529b9832c139ef77f2c755d0b0ad37e599ba8f1))


### 0.1.1 (2015-09-27)


#### Features

* **all:** initial implementation ([b9aacd06](http://github.com/aurelia/pal-browser/commit/b9aacd0620ca51f8648115220793f4df5ce030ac))
