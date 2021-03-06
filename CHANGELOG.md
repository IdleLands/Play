# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="0.11.0"></a>
# [0.11.0](https://github.com/IdleLands/Play/compare/v0.10.2...v0.11.0) (2017-03-25)


### Bug Fixes

* **guild:** guild self tax goes up to 100 now ([6243b24](https://github.com/IdleLands/Play/commit/6243b24))
* **map:** show alive if boss is alive ([286d222](https://github.com/IdleLands/Play/commit/286d222)), closes [#213](https://github.com/IdleLands/Play/issues/213)
* **overview:** there is now an ascension confirmation dialog ([4e75a8a](https://github.com/IdleLands/Play/commit/4e75a8a)), closes [#215](https://github.com/IdleLands/Play/issues/215)
* **pet:** _wasEquipped check for pet items ([0c83966](https://github.com/IdleLands/Play/commit/0c83966)), closes [#211](https://github.com/IdleLands/Play/issues/211)
* **pet:** display fixes for salvage-related options ([4c5abd6](https://github.com/IdleLands/Play/commit/4c5abd6))
* **premium:** show if you own a 1-time item ([ea0a963](https://github.com/IdleLands/Play/commit/ea0a963)), closes [#216](https://github.com/IdleLands/Play/issues/216)


### Features

* **guild:** guild base ui ([173abb5](https://github.com/IdleLands/Play/commit/173abb5))
* **guild:** new display for resources, new pet actions where applicable ([dcd533f](https://github.com/IdleLands/Play/commit/dcd533f))
* **item:** show base score on item cards ([fbf8dc7](https://github.com/IdleLands/Play/commit/fbf8dc7)), closes [#210](https://github.com/IdleLands/Play/issues/210)



<a name="0.10.2"></a>
## [0.10.2](https://github.com/IdleLands/Play/compare/v0.10.1...v0.10.2) (2017-03-21)


### Bug Fixes

* **release:** rework release process to do it in the right order, hopefully ([e064913](https://github.com/IdleLands/Play/commit/e064913))



<a name="0.10.1"></a>
## [0.10.1](https://github.com/IdleLands/Play/compare/0.10.0...v0.10.1) (2017-03-20)



<a name=""></a>
# [](https://github.com/IdleLands/Play/compare/0.9.0...v) (2017-03-20)


### Bug Fixes

* **all:** lots of memory leak patches ([f5ba28e](https://github.com/IdleLands/Play/commit/f5ba28e))
* **analytics:** re-add google analytics ([0b76fc7](https://github.com/IdleLands/Play/commit/0b76fc7))
* **battle:** do not show previous battle upon subsequent loads of battle screen ([7a44624](https://github.com/IdleLands/Play/commit/7a44624)), closes [#179](https://github.com/IdleLands/Play/issues/179)
* **battle:** highlight text is more readable ([2577d1b](https://github.com/IdleLands/Play/commit/2577d1b))
* **battles:** battles should render properly and better now ([7c1eb04](https://github.com/IdleLands/Play/commit/7c1eb04)), closes [#202](https://github.com/IdleLands/Play/issues/202)
* **chat:** chat input now takes mostly full width ([f5982da](https://github.com/IdleLands/Play/commit/f5982da)), closes [#190](https://github.com/IdleLands/Play/issues/190)
* **chat:** chat messages that are too long don't break stuff anymore ([7b97d55](https://github.com/IdleLands/Play/commit/7b97d55))
* **chat:** make pm indicator more visible in darker themes ([56c55bf](https://github.com/IdleLands/Play/commit/56c55bf)), closes [#192](https://github.com/IdleLands/Play/issues/192)
* **chat:** unread chat message indicator should be more reliable ([f322de5](https://github.com/IdleLands/Play/commit/f322de5)), closes [#191](https://github.com/IdleLands/Play/issues/191)
* **chat:** unread notifier decrements properly on channel change ([422da5e](https://github.com/IdleLands/Play/commit/422da5e))
* **donate:** donate button should now give information to me in an email instead of not showing up in their shitty interface ([b5fca0f](https://github.com/IdleLands/Play/commit/b5fca0f))
* **item:** item buttons now show disable reason where possible ([4c499ab](https://github.com/IdleLands/Play/commit/4c499ab))
* **logout:** actually reset the entire game on logout ([5fdd22a](https://github.com/IdleLands/Play/commit/5fdd22a)), closes [#204](https://github.com/IdleLands/Play/issues/204)
* **map:** flavor text now shows up ([1d91a63](https://github.com/IdleLands/Play/commit/1d91a63)), closes [#188](https://github.com/IdleLands/Play/issues/188)
* **maps:** hide phaser banner ([7c33786](https://github.com/IdleLands/Play/commit/7c33786)), closes [#203](https://github.com/IdleLands/Play/issues/203)
* **party:** unsubscribe from party observable when closing overview ([c44bb55](https://github.com/IdleLands/Play/commit/c44bb55)), closes [#195](https://github.com/IdleLands/Play/issues/195)
* **pet:** pet upgrade cards are now 40px shorter ([47f26cb](https://github.com/IdleLands/Play/commit/47f26cb)), closes [#199](https://github.com/IdleLands/Play/issues/199)
* **pet:** rename Attribute to Descriptor ([5c6e9c9](https://github.com/IdleLands/Play/commit/5c6e9c9))
* **pet:** request player equipment on pet item tab to get up-to-date equipment for comparisons ([47cbbe4](https://github.com/IdleLands/Play/commit/47cbbe4))
* **pets:** if you have no pet it will no longer allow you to visit the items tab ([ea57918](https://github.com/IdleLands/Play/commit/ea57918))
* **pets:** pet inventory moved to sidebar ([7e3801c](https://github.com/IdleLands/Play/commit/7e3801c)), closes [#185](https://github.com/IdleLands/Play/issues/185)
* **primus:** do notifications first, and return if type is error ([525bc3a](https://github.com/IdleLands/Play/commit/525bc3a))
* **settings:** donate button now opens in a new tab ([5388069](https://github.com/IdleLands/Play/commit/5388069)), closes [#193](https://github.com/IdleLands/Play/issues/193)
* **sidebar:** sidebar now has the correct height to compensate for the loss of some info in pet card ([8b11e78](https://github.com/IdleLands/Play/commit/8b11e78))
* **statistics:** stats are now split into 3 columns ([df425c8](https://github.com/IdleLands/Play/commit/df425c8)), closes [#197](https://github.com/IdleLands/Play/issues/197)


### Features

* **app:** show an update thinger if your current version is outdated ([dc51919](https://github.com/IdleLands/Play/commit/dc51919)), closes [#206](https://github.com/IdleLands/Play/issues/206)
* **chat:** chat user list will show up if the screen is wide enough, else it is collapsed ([3881d3e](https://github.com/IdleLands/Play/commit/3881d3e))
* **map:** bosses now show when they respawn ([82983db](https://github.com/IdleLands/Play/commit/82983db)), closes [#136](https://github.com/IdleLands/Play/issues/136)
* **overview:** you can now buy items from a shop depending on the region you're in ([1b52ddf](https://github.com/IdleLands/Play/commit/1b52ddf))
* **pet:** can now sell items from pet item compare screen ([fdc5485](https://github.com/IdleLands/Play/commit/fdc5485)), closes [#178](https://github.com/IdleLands/Play/issues/178)
* **pet:** you can now rename pets with a rename tag ([2700b8a](https://github.com/IdleLands/Play/commit/2700b8a))
* **pets:** can now give items to other pets ([fd61198](https://github.com/IdleLands/Play/commit/fd61198)), closes [#152](https://github.com/IdleLands/Play/issues/152)
* **pets:** pet tab is now remembered between navigation ([724258d](https://github.com/IdleLands/Play/commit/724258d)), closes [#181](https://github.com/IdleLands/Play/issues/181)
* **pets:** smart settings are back ([262738d](https://github.com/IdleLands/Play/commit/262738d)), closes [#201](https://github.com/IdleLands/Play/issues/201)
* **premium:** consumable premiums now show quanitity ([8ee701f](https://github.com/IdleLands/Play/commit/8ee701f))
* **theme:** add hacker theme ([d6bf549](https://github.com/IdleLands/Play/commit/d6bf549)), closes [#167](https://github.com/IdleLands/Play/issues/167)



<a name="0.9.0"></a>
# [0.9.0](https://github.com/IdleLands/Play/compare/0.0.1...0.9.0) (2017-03-08)



<a name="0.0.1"></a>
## 0.0.1 (2016-06-27)
