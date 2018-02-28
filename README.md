![webpack-4](https://img.shields.io/badge/webpack-4-brightgreen.svg) ![vue-version](https://img.shields.io/badge/vue-%3E%3D2.2.0-brightgreen.svg) ![license](https://img.shields.io/badge/license-MIT-brightgreen.svg) ![npm-version](https://img.shields.io/npm/v/v2-lazy-list.svg)
# v2-lazy-list
A simple lazy load list component based Vue 2.x, which will be on-demand rendering the list based container element's viewport.

## Installation

npm:

```
npm i --save v2-lazy-list
```
or yarn

```
yarn add  v2-lazy-list
```

## Get Started

```
import Vue from 'vue';
import V2LazyList from 'v2-lazy-list';

Vue.use(V2LazyList)

<v2-lazy-list :data="data"></v2-lazy-list>
```

Visit the [examples](https://dwqs.github.io/v2-lazy-list/).

## Available Props

|  Attribute  |  Type  |  Accepted Values  |  Default  |  Description  |
|  :--:  |  :--:  |  :--:  |  :--:  |  :--:  |
| data | Array | - | [] | the list data to render |
| height | String/Number | - | 320 | the height of the content wrap element |
| item-height | String/Number | - | 40 | the height of list item |

## LICENSE
MIT
