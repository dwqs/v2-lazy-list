![webpack-4](https://img.shields.io/badge/webpack-4-brightgreen.svg) ![vue-version](https://img.shields.io/badge/vue-%3E%3D2.5.0-brightgreen.svg) ![license](https://img.shields.io/badge/license-MIT-brightgreen.svg) ![npm-version](https://img.shields.io/npm/v/v2-lazy-list.svg) [![build pass](https://api.travis-ci.org/dwqs/v2-lazy-list.svg?branch=master)](https://travis-ci.org/dwqs/v2-lazy-list?branch=master)
# v2-lazy-list
A simple lazy-load list component based Vue 2.x, which will be on-demand rendering the list based container element's viewport.

>v1.x is not maintained

## Installation

npm:

```
npm i --save v2-lazy-list beautify-scrollbar
```
or yarn

```
yarn add  v2-lazy-list beautify-scrollbar
```

## Get Started

```
import Vue from 'vue';
import 'beautify-scrollbar/dist/index.css';
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
| threshold | String/Number | - | 0 | the threshold value to trigger next-fetch in infinite scrolling |
| tag | String | HTML tag name | 'ul' | container elment tag |
| item-tag | String | HTML tag name | 'li' | item element tag |
| mode | String | demand/lazy | 'demand' | render demand list or lazy list |

## Events
|  Event Name  |  Description  |  Parameters |
|  :--:  |  :--:  |  :--: |
| reach-threshold | triggers when reaching threshold value| - |
| scrolling | triggers when element is scrolling | - |
| scroll-stop | triggers when element stop scroll | - |

## Development
```
git clone git@github.com:dwqs/v2-lazy-list.git

cd v2-lazy-list

npm i 

npm run dev
```

## LICENSE
MIT
