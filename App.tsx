// @ts-nocheck
import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";

const HKDTAX_LOGO = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAlCUlEQVR42pWdeZxmV1nnv8+5975rdVX13ulOOgtNdiBkQ8KIIQjIHrZEQWHGJWYCAmKMo46ACCgSYBglwABhk13IgCijgIKBEAhLAtnTWTtJp7vTS3VVvdu95zz+ce5y7n3fVqf5VKrq1vve99xznvX3/J4HSTOrqKKqiABiQEAUAEQEVSXLUmzmUBQRwUQRkTGISP7lX6+qKCAIFD+VfwMR/724t3+Zln/zF/x9QINr+U0ARf2tKe7D1D///moNxTur9fjncs7hnPXrVr8mYwxxFIGAc2765vl9VRXJMquKos75B8JvoohgRMiyjCzLEIHIRIgx5aJFxG9o+YAaPkLtoWf/kxmv1XKTpLwmjfse+X7+gJT/n3/hoVrrsFmGqhLHEVGcVMKloOpQBFVQtUiaZvmKnV+ogDERqo7JJEUEkiTBGJOfUn5S+XMpgpm5T/+ZDQxfUz+A4rPESLCR/5n7zJDAXDBkppRSCQ6VpjhVsnQCCq1WCxMZL425hgHgHDKZpBqqjjEGay1pmhLHCXEcFa+uqUSxkeUpGpmWE9Wpxfm/Sfnf5sLJJU/zByzMQ6X25QrK/07JqBYqnpuTXGsIpLpYX6G2NROUb36xF5PJhFarRRQZqnPJtTZNrXpT5KUvTVPSNKXb6/qHLyST2XZG1eXLMYiYmjRooB5SqialhfR2pLFB4A2wBgchprgJJn9tsbmVxdX8PtJQYS3tdHG9+nMhgSZQKZe/ziCiiHjNG4/HxHFMkiSlfXbOYQpbJgaszZiMJ3Q7Hb/JzjWkTadEXzCIxPkCq4cD/7BoIC3q1dEQOAwp7hVKpNTOrNgcaaqseonKBQJVqdblPSKS2/O62mpw0KVxKw9ZxGBMseneibTbbdK08AfB51jrcml2jIYjWu02pjBqNRMi/0mTPMv25Qcgs6xZZRKKDS1fVXj0GZ+vpaprY43a8ORS89I6wyXJf+DgCtlRhdFwSKfbLn2CKezKeDQmThLEBBKnlCdZnVpzY6rXlvJSv5CrYWix6gutSXioXqXqNTdca79Wa6xvtNcuJTD7M2yl/juC0DQFkLQTRqOxX7NXYR+qiDHEcVzecPrUpTwFSpUpPscvMnQs9XVJQ/20vvlHkABFp+xVpXZSbkyollp7aG82UJlhu3XKGx/p76V5VOfjQ4Q0TRERYoAss8RJHLxJGrKtde9TbJ4EMVShRkK54HKDguvTTjkIJaTywE15KT109TSlB60tVqk2sXgMFb8kDe2nq46kaSPLe6h3YEGM6e1hi8lkQhxDnKUZLk8DaiKdP3AtoHVarN2HNSplSEIeXM7KEEpbRN3JeC8ahDQqOKnkr5Iiap8hYbitDSlSUNHgsHKpdIHNk3rgPyWRocCXGVolFMX7nbXEmc18hlHcpNj9/GRFJVALLVW2el1jswqPJrn6BPGIC2JJQRqLdlXcU2ysTttKL/auYeTzz3FFrlhImGk4kCIJcGEAW6pQFebkQiNSHVIhXLlNjqKILMuInXMkSeQfWqvlSMNxVDctxLMIcVxD7SjjQoKsODxaHwxX3tMvML+PulJtJIglqYVR3jkQSK/TeqBcZFdFcFTcQ1RrmixUh1FoiBDGi7mv13oaaYzBZhD7WE68GgcKqU5rETplQFx41UoilMAQlq9w9dNXV3MwRdDt1OU2s4zC6sG7VA8yK2spHNh0BKCFPueHGeQ+DY/vPbXUAv3qQxpuyRvVPPgW4pq1aeSMUvOiUmUIRUxXbKq4fD3NdwaITAjxlNmGNxFVvKnkkVWwHi0dRvE+qcE7DcdRk8vipyrjKRattYA7lD5QkcrPa2jQ6ymfMUJsTJiXSiN31SoPVp0ZeEoDaioTCalnqWIqW5Nn6zk0FiYFEipToSz+8/PDk2aMpFILlKR4UbBJft/rUi21Z81to6meaSoIb3jqIgKIo8hUAWkt1grtTSV9Uoi/CxRH/YNKJEfOWLSRqzoXGOnca5J7UDQHALRK2nN11DJT0coGT4Uyxf0K9MTnuiaKcgd1ZBisStOopLYEX1yVpQFiImSSplrgXDAd1fsb5KcXx6VrmPXPpdkUiNoE3tQ6JI4RI0eM/8nzcJ1MECNErfYU0jjb1FQWxgThZwF3uMnEOysTVda+YbYqYPeIclCCIKqOuLAerth9rUNXikBmMZ02D73rXez5ypeRxS5Yl6uq4IYTuscey8lXfRjJUVyV8BD8vV2aEnU6TPbu5a7fuYz08AGII6/RgHOKSSI4NGDu5FM44R3voLW4lnve8qfs/9Y/E893YJhhnKAdU6LfpohcCpuniokTzMI6Okcfw9wpp7LmiWfTP+VUIoE0y3BpikRRYJpyKURQRw21rqd1ppbaxR6N0hJtrexQFWMUajK65RYO/eu1mB5olm9PBG4I9pRj/WtrGUVlNzXLMK0W6YGD3HLhC1j63veh6x1uHsXgYpAhdDcsctI7301ncS073/gn3Ptnb4UEshQWj2kRjYXlvWMkgsyUoWPdiThvJXzIAWaxR//xZ7Hl4lew5ZdfTrJmDelw6E1FGO81QphpFNzVHFisjSCyiXmEF0yvRxJFyEIHzbwEYgySjIjnF8oTFDGBPjmwDmkluNUBt77oBRy6/vvEW/qo1TzFckgUoSsjOts3c/pXv8b84x7PfVe+k/v/7K2Y9R26/Q69LXOse+5xkAntr9/H6KHDrKyMIRFEtQZjqTqiQB9dlnLgumvZ/y/Xsuuv/xePeeNb2PKSl5FNxqiziERBjFvfkwDPr8KtPC42hScrQcfC8UvouqUoGOCsxVmHWovaDKzz9sq6yqO5IKp3FoljdJxyy0su5MC/fgezqYebpOAyyLwo6/KQpLfAqZ//IvOPezwPfvAD3PP7V8C6Dg5lOBiSnLWJNc88njXPOY7OaRuYLI0w+ANS63CZxaUZLkshs2i+TjKLiJD0O7Q39BjcfTs//eWLuO31r8GIQUzkC0sBHKFBVlQmYVrP0xU8mBAiwAWYWeSpUiC2xf1q0bpUUqrBh+Zirs47DJxy68Uv5dGvf5Nocw+dZBU0H0XocELSnuP0L13D4pN+joc/+xl2vvY1yIYeTny5IB2kHPrOLtY+6ShAWf72A2RjCwstTCgZedyHCkZdHpR7IYnwG93qtWEu4oH3vo/R7od5/Cc/V+J7BGDplOMKywt5nh3PqllUYUEAK+XvifLtcfi0CPVZi0qQL4vxkmcixETc9oqL2ffVf8Bs7qNpWqHLxsAoIzFtTvvCNax9ylN54GOf4K7/9iof/R0YkOMCiANz+DB3X/L3pDH013fQcQb7stLjAmSF9zVgWmC6LVzkaxtlQO8UXErnqD6PfP4aWhsu49T3fYhsNCq1TacDnap8EIBVMVM11ungQF0QaOebWJy1I6wD5yrvMhAharW441WvZN8Xvki0uY+mE0xxX2NgbImscNLf/i3rLriAfTvv5s6v/R2bn/d8aEdoZnMNEJwxMJoQPa5FhgNn6Z3lsbnIVIiGivgDPbxEtus+0rvvYWKBdW1sYdfyA7TjlPamHg9e9WEWznsq217xa2TDIUTRTIBa6kUHAGINXHWVmlV7Pg1yVmYhzPHLApPzV6N2hzsu+U12f+KTmE1dXDqpJCUCUgtjy0mf+Twbn/1sxoMB80dv44LPfaEeDwaLNYAlzbPvVqNOOB1P2qUlhj/6EXve99fs/9I16HyCjSuUx6A4Z4nmY+770z9kw7OeQ7y44O2mhABMnRwQhjGmFudoldbMLk4HBrawlbWNVFBH1Oly1+tfy8Mf+ghmYzeXpFw1jEAmyErKiVd/ko0vegmT1VUkjjHGkI7GpMMhWf5lR0OywQp24hgf3sP+7/0PHr3uj0lX9qKpww4GuNEIOxyRDf13OxrjxmNMv8/cBRew44tf4vj3v59kpMS2qmeDt5NJr8No50Ps/tTHiOIYSnUv8uEARK5hiP4QqoJ5Q5rUhVC5Fz0TpKAa2E9xXq2STod7//APeOi9f0Wyue+Lz4VhNwbjgENjdnzwQ2x5+ctJV1aQuMIjC6clxiBRhKjDtObIhg+xdMs70PRR0vEe9vzo7aSrD2M6vVyqDSYSn06aIuvJcMNV7OoKmy+9lGOvfBdmqTAjxUYINktxHWHvFz6NnUyQOCqdTyV9WkJ+BLihCWkadeMpQSQ+oyRT+fry56Tf5963voUH/uIviTZ1cTYrQVkRg2QODox5zF//FUf9+m+S5pJXgN2qddVVZ5FWn/HSnRy88W3Y8X6cdFBpkQ4eYff338zowJ2Ydge1WaEAFQAqgIkgikgHq2z6ndey8LTzMUvjPJ2rwA3pJizfcjOrd9yBtNq58FAWtkpEumHWTL1QU98obWad6hpwVIBu9fvc9/a3ce+fvAk2dHHW5rsCasChGBdzwnvfzbbLXkO6OoAoxiG4HA9EijhMwVlMu8vo0Rs5dOPb0WwFq23S8YR0PEFpkY2X2PXdN7O8+8fE3Z6PTXPJcGXcJqiYMtra9FuXYjKaQB1RnGAPT1i56Sc+f3bOO2unJaWjSG1LcoAYDLgjpM2m+i5MldqKqMU5R9RNWNl5O/e+/U+QtS2fVweFagR0khFvO4rNl1yGHU98qBOm/xIUyYGo02Pw0HXsv+mdqDqcJmSTEVma4rIUl06AGLVj7r/2LRy851pavV5eoBekyXUyBusc/XPPIVk3B2lagrqSxxPiYHDPzhIyKwRPCjJRUxO9Cpsm1JAvoiimBISaIlMRKZkEJs9YXJpCt+3jL7V1XNEpptti9a57uP2y38C0W1VOidQSdA87Gfbf9jn2/OCN2PEK6WRAmk6wmS2/nHM4m+GyEXZ8mJ1fv4JdP/obHx6JljXhEo8UQWxGvH4D0fqNaGqDeqWUP2Z79+YAhUzxejxjDYxoWYGMp4vxWuephLVnadbzNTfIefUudzpmyloImlmidV0e+dinWPi58zjmksuYrA7ymKugjDlM1GJ04HbGB26jd/SzENPCpcsM9/0MMLiCu6IKTuhvPpd+1MFmGct7fkZ/z+NZs+VUXGYDMCvH+lQhSTCtNkUNC6nXXtx4lBckFFNgllKVUZFauTHcwFmsA6mVDJ1W2Jp3DIWaelCgzH/F+NTI2hrVxVlHtLbFXVdcztyZ57J49tmkq4Pc6wmKwdmU1sIOtjz5zV4gI5gcepAHHnkdSExBBnXW11g2PeFS2oub0Xy/7GSMy7JZsIh/8MkYNxrioir5c7n3V4Wo26sEp2a2ApSmDMbF20DP1AR1EsQ7M6Acpw34PLQH+VUjHiDYN8S4oPoGPmeNDDoZcfslryQ9tESUxGWoY4LCkJsMsZNVXGpxk9XcmFucOpx1WGuxmcOmq9hJRjZeJRsPZjDHAkQ8TkgffojJ3j1IktQezap/9mTT5rooBfepyFNVuGcKJ+F1WgMAohnQlOzfGepc5bY6zIjafY7+3dcTDy3GSs1zi7XE812GP72Nu97wakyrVZYHNIjwKanDBhUhyxzWeslLM4e1fiN9iGFyFla9IFWCIJ6rSyTC4e99j9HyCKkxMXLtMdB77En1a1Kn6jWxR1Oiz8IRaBcSkMEkyDgaIWEcIakS2YgTP/AxHvPu97DpNy/FLE08n6SQQhE0zYjW99j98U/x4AfeR9zv4bK0jn5oGIt66m2aWcap87Rj68isQ10zQ9UGtSAHio3BZZY9V38IbUtpq0XxFL0sJV7s0T/jzJKpgU7jpM0MzRQ6LRriXpWI0jilstYgRUykqEToOIWx4+RPf5aNL3oRw5VVjr3yShbPezJ6YIhGUZAK5TnoYoedf3g5Szf8gHiu7/HFZhGsYJXYDGfVS55Tj0s6h8MFuVKDxqo5bukcrV6P3Vf+JYe/9wNkoePNRpGKRgIDy8KZZ9PfsQM3GnltalCiZtGBzUzUIQBTQ66jFHC/SB4AgyPyjApNOPHjn2LDi17MZGXFf2iScNxHrqazuJ5omOU0igLgVTQ2aDrh9kteRXbwECZJSjvbZEtlmUWd/3K5+tpMwdpyk2pf6lBjiPt9kn6fXf/7vdz35v+Jru/gXJ13IyIwUba8/FVI5J2fZ+tXCFNR99ZG0mEKrodTxbkZZJ0GMmIDjkkGWBORjUZ0T9rBxosuIh2OkCiBKMIOhnRPPpljr7oKs5IRFcX3nGIh1hLN91m9+XbufMNriFstr25KPRBSzTdOUZtnBwpWwcytIekkJP054l4v/+oSdXvoyir7/+nr/OyFz+Pe33s9rh97+M1p4FgM2eERa844hY0vu4h0PPbFpkCqS01UV1H5CjiLBuXVe6/ZbQVF9UyQvHovAcXWYVeHaCR5zRdMHJMur7D+ootYvv56HnrPezAbe1ibgSgGRdMJ8YY+ez/5aXY96clsv/Q1jFdWfXyoVYHcOUXIUPU0FFXQTLnnty+BoeCiok4BThRdXma0636G992HcRCt6+CcQ5wGNeb8MFPl+D9/F9HcHOnyah5WNdCXGZQQRIin2Z8N8nW9taTBjQ8kXCUgCAZ/jgzpYMgxf/4XDH/4Qw5991p0vc+VtVDlNCNaaHH3H1zOmieexfyTnky2sgqmYqd6MyGoc7ntE4xzHP7aPzA+ZLFJwyYZkBbEc20vUdYiriLrqQiYCLdvwPFvfiMbfunZHlYrDu4/7i5BVTB1snX4ZQLqRFWgNGH6mkM9ogEXK3T1UlA6fG3kuKs/Snv9Bswgrej2RbYQGTSbcPtv/VfSAwd8mOFsmZc6h48BXe5E8qwnXlwgXmiRrO0SL/Ywiz3ixS7Jmg5xqw3WH1ABzQkKUYxYh+4bsP13X8v2N/0p6WCARAYxBf1CA5RKZvCn/bpNncors9t4Gn+vOFmKOIcEwY5qZSNLhqox2OGAzo7HcNwHPkgyyIhdfkjFJrqMaE2HlVvu5M7XXUbcboccYg/TO4crmP5F4Tt3ImItxmaIzTwg6rzEmSJWENAo8XWaA0NaY+Gx73onJ7z7vWSDQZ5KSll5KxIAPUKWVuyHqfPe3Ix2rQblNI6RKPYgaByXv5soIDNqwKgqvqKIdHmFdS9+MUdd/vvIgRFREiNRhDERYhLUQWvzGvZ89nPs+j9X0Vkzn0tOcUQ+RRSTryFqYaLEV/aiGKLI268o8lIW++9gkFGK7huiB0csXvB0Tvnnb7P1DZeTrq6WoUfJVFWtkUWPQGRBkCIXdvWeiVp1Pk/CAbe8AlmG2bdc5p45GRS7/2CAr0q9Iyj/zcQR2XDI1re+jeUbfsCBb327qj0ES2sBO3/71XSPOZaNv/RcXJYyHh5C4qRQGVSEyBriA/uRw4owKc2IlgzF/KkSaB+1jYULz2fDK36NhWc+AzGGycqK3/wa1jmr7+8IbRCSe2ENOnqaNygMrrWWNT//VI6yGabnA1Gf/kS4SUpr29aqaDyF20pVsbUWaRmO+/BHaL31bagEDNccpDVisMMxh66/nnVPfyZJd4GjTns+mLjk2igQOUPrlafhDo/QiLxrKC+pJi2ixXW0t2+nfcqp9E4/jWTTJl/6XF316zSmwTydsXFOS5K/1BqA8hLEyvKqNnnOM1tRVDG9Xhnkz7KcdjicIjvOPDlVJEkwrWRGE2njnoMhYiJM0popFBrXebFHYmy5yQQdTzzsNlW2lCmtC1t9p2vmAUCxsjIoraUyTdIh7OHN0jJKL2unYWxUENPjxGcC1pV0MkxlI9V65o/aDDFxFaCG3BTVyo4VnrqJsAQIUUX4yQtSoQMQCUhETNV5pNnO0disqvNzWlpjEQ1sUBVE1zfPvyCany/tjB0Ma8z9qNfzkQmQDYaYOCbqt70UTVKPWOcqHM3NYYri9iSFVlLLKYPgBjcY+o2OYkwcY+Lk3+0+ttZ6uF9AjtBfXJcsncGHrG+yBHzw+lsEWV0daEkWL0p5jQ1UdUStNkvf+S6rt95Me9061r3ghT52sxbTanP4hhtY/smPift9Nl10MdnBg+z/ypdxzrHuGc+gc/zx2OGIeGGeg9/+NoObb8YNB6x9zvPJHniA1bvu9FC/8ZIUdXt0jj+OuTPOxPT76GDMYOkBDu3+KSZuefRbiw56TyFx2Yje+h3MbzkFm6U1UsaRWJN6hJbcaVCqXoGsnEgIVknVAalBR4Nmnp524G8+wQMf/ShrjtvM2mc/B+IOLsuI5+Y4+KVr2PnuK+mtX8Omiy5msmsX97761YyBJ3z+s/ROPBFptTj0rW9zywuex2h5hfVnnsHRv/5b3Pm63+Hhb3yDyJCDsHkyMR/ROfE0tv/BH3H0Sy/moZ/9gJv/8Y9o9dd5OL3VRxDsZAiijIcHOP5J/53FbY8jHQ8wJkGxucOIAklyOYXHY0u+K1Wrbv1gryooUxot7kVNRBuMd5GpDsnigOL+GlpxTLR2EZz1OW/OYU56XXpxTGv9Wv/wcUx7ru3ZrSJEIiz9+Mfc9SsXwfIKG895Io/7x2+QrF0kmuvRjmO6Wxbobt6GGkFXVhnu3Mnkxp9y60W/jPvQKvPPO4dtpz6P1tx6stEyy/vuQFD6287018ZLrN32RKLY0OrM5/vmjUM28Wh13Oph8hTRX3OYOCFO2r6oNB75erZKUBdmuotJPCASK1X/hmE6n/W/5uiEy3y9wTpMp4v0eojxwydQQbPMF8+LuMqmMHFEa9YwemQPd7zkQsaP7KV7wnZO+cwXMGsWSHPpsFlGZ8djOelr3/L2MstY/pdvsuv1r2P10d3cdfllnP2Un/GEl74PLCzvu4Obvvxq1KYcfeavseH4c7CpMl7Zx70/+AxLj/yUbLxMq7vI+mPPY/OJz0Bdyt3XXcXw0C56a0/g+HNfiUjC6sEHeOCHn8SmI44+42UsbH0CWToKelZM0HJR38y41ofWBAo8/aYGMkhOtBzceTvS6aBpymTNPOn+R3Oecs4URXx3Qssw3v0I9//FSxnct4vusUdx8me/QOcxj2Fy8BDx2kWf6wKZqvfYkQWJWffil6CTlJ2v/FXS0Zg9n/sEx77pLdjRmCwdlrmqy4akE4dNB9z41St49N5/pjO3ydvFdMDuW7/KyqM7Ofn81zK/6WTuveFqcNCZ28SxZ17IXf/6Hh6545/YcML5rNl0EjablJ3qBaItYelDq87KuF6fD7siqx3XgKQowHDfHm565s+X77EIxlq0J+XEC82L7rLQ5t43XkG6tERmhK1vuJzFc85lcPAQkjSqqtYPcigYDelwxNzTLiDZuoXR/Q8zvuO2cpaBzOgsipMu2057AZtPOI+tpz6XKO6w66a/5f4ffoJHbvsKW097PltPeTqDA5dx93VXsevGz7Dy6G0sPXgD85tP57RnvQmJO7jJsNS6qvG7Mfog39w4JFH6arwJ3LirMTWdN8kk1mGWh+X1KE/TbNEyVdY/IHWKXdqPjhXTT7j/A1ex/oUvITnqKB9415rvdaqUKMb4Cho5gtoYHaGuagLMJkO2n/FiRkt7GR7ahQK9tccTJ12wKZPVR0nHx7D9ib/C0sM/5dDDP2LvHbuJki47zruE7sI2JsMlrwW4WsFfQ8p44B9iDTp4RAJpI+wW1xrc0NqwmR2f/yjSSdA0JVozz6MfeD+7PvJhTCQlpO5yDx61eqw7/+kc/se/Y3jH3dz52kt53Be/is2tswkaWTRLvVd0ltaaOQ59/wYGDz4MCK1tRwccncK4mzJUMcZw6zevZNdNX0LtiCjpYIzQanfBGRCTt1J02X7Wr3J4908wUUR//Q42n/QsJqPD+eY1GPm59/aoTp3JYI6cdQVFUK1FVNBqseYp57HmvKcw9+TzmD/zTOKtR4PL89GydcrAasb2113BaV/+Muue+VxaCgf//v/xwLv+nPZ8hbY4gCShNdcnWZgnWbuWwV07ufeKN+CwSKysff6FOfmx6uY0RftpYth///U8eNOn6c1v4JyXvZ+n/sb/5eyXfcjPwSlCl8iHPQ/86OOoy1BrOfzIrTz0s2todedRlzV4QMLsiQ0+F47LMvxMLDAIj3JCOHHsGQCHD0OvixuPkYUFXDpB4xhMlDsTUIkxsaN/1llYlO0fvprhLzyV5btv5/53vJ01P/df2PgL5/uRA3HM4KFd3HzJr+es/SUOX/ddskf2oBPY+rrXsHj+00iXlzDtOR9si0GMK5eeDg9gjJC0+vQWj6azZhN77vwmWTpApI1zllYr5o7r3s/++65lcevZLGw5hV03fpp7r/8gC1ufQG/tcaTjZZConslMAS25DayCy1xqyig2HPaQS97KCnGWwYGDNehZoggdDCHL0P0HvaxmGQwmPu07vOQdzbq1HPfxT3D7085HDw6462UXMveTW2E4RrKMyc4H2b3zoyUeHgOtxTk2/96rOebNf0Y2WC3VydmMdLyEy3xOnWWwePS59BePZfnR27nh069EojZpOiKOIsYre4niNg/f+g3u+/77iVrzbD/7VWza8VSW9tzK/vuu5Zav/TFnvOivMEkvoLRJg0RQz6PjKUJ52X6vtdTPZZb+U85j63BItHUTFMUjY3BZRvecc9hy8cUkGzd4dtP69Wx6xcuxCsn24yDLsIeX6Z97Dsdd/REOf+Wr2HTCweu+y9oXvpBo43pMt13WSeJul9aOk5j/xV+ke/rpZMvLAQPIEncX2PjY5+BUac1twE0mtPqbOP25V7L7lmsYHtpF1FnkqFNfyKFd32F4eA8mbnF47y1sOeW5zB91BuuOfTLpZMJjf+H36S5uw2Zjlh65hfXHPQWXDfOkYsYEh6DLUw4vL9dbuPMekLJGFOyidDu+URBwKytViUmVqNOFPCxxy8u+MbHb9b+PRpD6ySDqHKbfL5sN3XgCiedHz25gTHGrqzltTcrwSkyCidseQMhGnqGKYuI2Udwu2yyczfLBQhHZZICJEkyUgLNkk4F/T9QiSvywoSwd4WxaHx3VnL1VNCAhyPLyik51IxbsowZLUQvWqZEKUyuCzbxjSXKVLmq5Ps6JahU+dVUDjN/UsP21Pjem2LgiVJlGUuqHHFS8atUbweVgq5a8QSkL5lqvRGp9gEqtI7kkHZi82VB1aqOaxKESyikwvaK3NiClY/wpS4jO5nSOom5chuwi9UDV5EOxqE3VqpgRQUG+8H4Fqah2iEHjeJlZaSG1cTmXQWaMSCm73lSnpsUV7bP1y95nxM45P5Us7zwSrVK6adGUGl2tiZfV5q9whBE0zBqJCNNzjWSKta1N+MlpvVmlxoupEgTRaWyzWW3TOhdhRkGiKe+KzTLvRKomYg2GiFQ8mHo6Q1nUqSPBodSE7aNSI3XWprIVrzfUPH7BMFBh5mGFoZUr5rqUPVD1JmoNOwokHGJBIx3MkRcNVVfqW5tjfBV+CrFvsnPT+GEgOarN+VNS3qwWcMqMooxwBFw4mJGgtSZTGsOOSjyzNBnB/Iv6zAYtB+9IaLmKDEvDrB+0FudWxfJa45DMFsViPIuJoygg21QNG+G0ylk1+VoBsT6brg77NKcCSV1FaiPztJqDVZubpdNlKpXmWhoZVDA7ptaeEbqMwOnMrAFXBj+f81A9l8tHhJo4aeVBY30SETNrBo1QUo8wF02ndLXcIKlNEVLq3NRwstmMzWi0WJQ9IGWrf4UsScGmmuEQtPa/8JoLnEo1IUSF2uEWmpckMXEcR34+qLqZsdisnrmmPKjTKc9Nk8kqEkzf1foMxMB/VvXJRhih4RA2qQbuaHMEbn1SZu2QZTplleA1KjPcnDB1d3UOMYbI+CEcdDpd1DpM2Ko/kwsS9nUEnrA47RLL0+p7aMTL9oQ6EUxV6pSCUNSd5nMV6tISIiYatD7MGslXlkNdfS0ydUKhttR5gCHvylpLq+UhNuOckrRaREmMLWq+OsOGhWpFFQPOtjszpFWZPcOxSawL7FXNeYWUYw0GgrkaPlLjOlY1Y0WxXkXDIWuqM7hA1HkxGtaWfQNjEickcQLqcraaKt1u38+xci6PT+tQVrXgvJMTbdQ/ZUoNZkVVhaVhZifydFOzhKOgws7cgskqOvMwtMF1NBSsU1ffJq1A2RqBXhvSSlHbN3Q6nVJgTDHKUgS63R5pmgVB6BThfUolVermIjTwFAz4xlY1r7jQBh7BYak0vbiGF2ZIuMyQ7mZc2ahdauXYXKjAuWmzTunmBIIyQ/FAo0OdJTaGbr/PJPOj0U1BoMwHP5R1ZbSk2R5ZLfUIY5aOpMX/PhuqHE2vR5jX1UwZVGv9mBpwX7Qmn9ro25S67OaBc2Yd3V6X2AhObVlsk8kk9VYa5ymrJiKzjsFg1ddz46g2mDD8LvWgpHGF2hylIqp35dxAaU64nzX7dyZjqp4hSBlwSyN6kiOqNVMhl4STi4LXFSHe3FyfODLYHCAppxJPJpPy/4ygWJcRgwOGoyE2yzDGExvDk9VGRlsafzHTwbTUt6qcNG5mT8sXZOqBa0PemNX8HAIPIUjQDHDKDHmqwuZv4QETp74nJUliet1OORyyzlzFb6DmYYgEG1D8nNmM8XjsS5TlXL1Z06Btaa6py8Z0sO20wQgPEREXqJ0ErK0mXTPIm4UG/NHcWpnysdNH5226y51JHCe02y3i2HO1Q9grrKXLeDzWkKVqwiZ2VSTyMZ+1jjSdkKaTcsK5CSlrM6L++sKDVooZHrduB00TPGm4FWmAB2HQf4QRBbNMQTF9PcAi4yQhyb+0wDQD6p7W5igK/wZgRQt4Yop2pwAAAABJRU5ErkJggg==";
import * as XLSX from "xlsx";

// ═══════════════════════════════════════════════════════════════════════════════
// VN TAX APP v3 — Hộ Kinh Doanh Tax Management (Luật 2026)
//
// Legal rules encoded:
//   A. Bỏ thuế khoán + bỏ lệ phí môn bài từ 01/01/2026
//   B. Tax Gate 500M/năm: ≤500M = không chịu VAT, không nộp PIT
//   C. Sổ kế toán TT152/2025/TT-BTC (S1a, S2b, S2c, S2d, S2e)
//   D. VAT trực tiếp theo TT69/2025 (1%, 3%, 5%, 2%)
//   E. PIT 2026 Luật 109/2025/QH15: PROFIT brackets or REVENUE_PERCENT
// ═══════════════════════════════════════════════════════════════════════════════

// ─── 2026 Tax Rule Engine ────────────────────────────────────────────────────

const VAT_GROUPS = [
    { id: "distribution", label: "Phân phối / Cung cấp hàng hoá", rate: 0.01, rateLabel: "1%", icon: "🛒", pitRevPct: 0.005 },
    { id: "service", label: "Dịch vụ / Ăn uống / Xây dựng (không NVL)", rate: 0.05, rateLabel: "5%", icon: "🍜", pitRevPct: 0.02 },
    { id: "production", label: "Sản xuất / Vận tải / XD có NVL", rate: 0.03, rateLabel: "3%", icon: "🏭", pitRevPct: 0.015 },
    { id: "other", label: "Hoạt động khác", rate: 0.02, rateLabel: "2%", icon: "📋", pitRevPct: 0.01 },
];

const PIT_PROFIT_BRACKETS = [
    { max: 3_000_000_000, rate: 0.15, label: "≤ 3 tỷ: 15%" },
    { max: 50_000_000_000, rate: 0.17, label: "3–50 tỷ: 17%" },
    { max: Infinity, rate: 0.20, label: "> 50 tỷ: 20%" },
];

const TAX_GATE = 500_000_000; // 500 triệu

function computeTax2026(transactions, businessConfig) {
    const valid = transactions.filter(t => t.status !== "void");
    const revenue = valid.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0);
    const expense = valid.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0);
    const deductible = valid.filter(t => t.type === "expense" && (t.has_invoice || t.amount < 200000)).reduce((s, t) => s + t.amount, 0);
    const nondeductible = expense - deductible;
    const profit = revenue - expense;

    const annualRevenue = businessConfig.annual_revenue_estimate || revenue * 4; // Q → Year estimate
    const isUnderGate = annualRevenue <= TAX_GATE;

    // VAT by group
    const vatByGroup = {};
    VAT_GROUPS.forEach(g => { vatByGroup[g.id] = { revenue: 0, vat: 0, group: g }; });
    valid.filter(t => t.type === "income").forEach(t => {
        const gid = t.vat_group || businessConfig.default_vat_group || "service";
        if (vatByGroup[gid]) {
            vatByGroup[gid].revenue += t.amount;
        }
    });
    let totalVat = 0;
    if (!isUnderGate) {
        Object.values(vatByGroup).forEach(g => {
            g.vat = Math.round(g.revenue * g.group.rate);
            totalVat += g.vat;
        });
    }

    // PIT
    let pit = 0;
    let pitMethod = businessConfig.pit_method || "REVENUE_PERCENT";
    let pitDetail = {};

    if (!isUnderGate) {
        if (pitMethod === "PROFIT") {
            // PIT = (Revenue - Expense) × bracket rate
            const taxableProfit = Math.max(0, profit);
            let bracket = PIT_PROFIT_BRACKETS.find(b => annualRevenue <= b.max) || PIT_PROFIT_BRACKETS[0];
            pit = Math.round(taxableProfit * bracket.rate);
            pitDetail = { method: "PROFIT", taxableProfit, rate: bracket.rate, rateLabel: bracket.label };
        } else {
            // REVENUE_PERCENT: % on revenue exceeding 500M (pro-rated for period)
            const gateForPeriod = TAX_GATE / 4; // quarterly
            const excessRevenue = Math.max(0, revenue - gateForPeriod);
            const vg = VAT_GROUPS.find(g => g.id === (businessConfig.default_vat_group || "service"));
            const pctRate = vg ? vg.pitRevPct : 0.02;
            pit = Math.round(excessRevenue * pctRate);
            pitDetail = { method: "REVENUE_PERCENT", excessRevenue, rate: pctRate, rateLabel: `${(pctRate * 100)}%`, gateForPeriod };
        }
    }

    const totalTax = totalVat + pit;
    const monBai = 0; // Bỏ từ 01/01/2026

    return {
        revenue, expense, deductible, nondeductible, profit,
        annualRevenue, isUnderGate,
        vatByGroup, totalVat,
        pit, pitMethod, pitDetail,
        totalTax, monBai,
        applicableLedgers: isUnderGate ? ["s1a"] : ["s2a", "s2c", "s2d", "s2e"],
    };
}

// ─── Data ────────────────────────────────────────────────────────────────────

// ─── S2c Expense Groups (TT152/2025/TT-BTC) ────────────────────────────────
const S2C_GROUPS = [
    { code: "a", label: "Chi phí nguyên liệu, vật liệu, nhiên liệu, năng lượng, hàng hóa sử dụng vào SXKD", shortLabel: "Nguyên vật liệu", color: "#e67e22", bg: "#fef5e7" },
    { code: "b", label: "Chi phí tiền lương, tiền công, phụ cấp, bảo hiểm bắt buộc và các khoản chi trả cho NLĐ", shortLabel: "Lương & Bảo hiểm", color: "#2980b9", bg: "#eaf2f8" },
    { code: "c", label: "Chi phí khấu hao tài sản cố định phục vụ cho hoạt động SXKD (nếu có)", shortLabel: "Khấu hao TSCĐ", color: "#8e44ad", bg: "#f4ecf7" },
    { code: "d", label: "Chi phí dịch vụ mua ngoài: điện, nước, điện thoại, internet, vận chuyển, thuê tài sản, sửa chữa, bảo dưỡng", shortLabel: "Dịch vụ mua ngoài", color: "#16a085", bg: "#e8f8f5" },
    { code: "đ", label: "Chi phí trả lãi tiền vay vốn sản xuất, kinh doanh", shortLabel: "Lãi vay vốn", color: "#c0392b", bg: "#fdedec" },
    { code: "e", label: "Các khoản chi khác phục vụ trực tiếp hoạt động SXKD", shortLabel: "Chi phí khác", color: "#7f8c8d", bg: "#f2f3f4" },
];

const DEFAULT_CATEGORIES = {
    income: [
        { id: "c1", name: "Doanh thu bán hàng", icon: "🛒" },
        { id: "c2", name: "Doanh thu dịch vụ", icon: "🔧" },
        { id: "c3", name: "Thu nhập khác", icon: "💰" },
    ],
    expense: [
        // (a) Nguyên vật liệu, nhiên liệu, năng lượng, hàng hóa
        { id: "c10", name: "Nguyên vật liệu", icon: "📦", s2c_group: "a" },
        { id: "c10b", name: "Nhiên liệu, năng lượng", icon: "⛽", s2c_group: "a" },
        { id: "c10c", name: "Hàng hóa mua vào", icon: "🛒", s2c_group: "a" },
        // (b) Lương, công, phụ cấp, bảo hiểm
        { id: "c11", name: "Tiền lương, tiền công", icon: "👷", s2c_group: "b" },
        { id: "c11b", name: "Bảo hiểm bắt buộc (BHXH/BHYT/BHTN)", icon: "🛡️", s2c_group: "b" },
        { id: "c11c", name: "Phụ cấp, trợ cấp NLĐ", icon: "💼", s2c_group: "b" },
        // (c) Khấu hao TSCĐ
        { id: "c18", name: "Khấu hao tài sản cố định", icon: "🏗️", s2c_group: "c" },
        // (d) Dịch vụ mua ngoài
        { id: "c13", name: "Điện, nước", icon: "💡", s2c_group: "d" },
        { id: "c19", name: "Điện thoại, Internet", icon: "📱", s2c_group: "d" },
        { id: "c14", name: "Vận chuyển", icon: "🚚", s2c_group: "d" },
        { id: "c12", name: "Thuê mặt bằng, tài sản", icon: "🏠", s2c_group: "d" },
        { id: "c16", name: "Sửa chữa, bảo dưỡng", icon: "🔨", s2c_group: "d" },
        // (đ) Lãi vay vốn
        { id: "c20", name: "Lãi vay vốn kinh doanh", icon: "🏦", s2c_group: "đ" },
        // (e) Chi phí khác
        { id: "c15", name: "Marketing, quảng cáo", icon: "📣", s2c_group: "e" },
        { id: "c17", name: "Chi phí khác", icon: "📝", s2c_group: "e" },
    ],
};

const DEFAULT_WALLETS = [
    { id: "cash", name: "Tiền mặt", icon: "💵", type: "cash" },
    { id: "bank_transfer", name: "Chuyển khoản NH", icon: "🏦", type: "bank" },
    { id: "ewallet", name: "Ví điện tử", icon: "📱", type: "ewallet" },
];

const EMOJI_PICKER = ["🛒", "🔧", "💰", "📦", "👷", "🏠", "💡", "🚚", "📣", "🔨", "📝", "🍜", "🧊", "🥩", "🎁", "🛠️", "💊", "📚", "✈️", "🎨", "🔌", "🧹", "📱", "💻", "🏗️", "🧾", "🎉", "🏥"];

// ─── Image compression (1–5KB target) ────────────────────────────────────────
// ─── Image Compression Engine — WebP with JPEG fallback ──────────────────────
function compressImage(file, targetKB = 40) {
    return new Promise((resolve, reject) => {
        const img = new window.Image();
        const reader = new FileReader();
        const originalSizeKB = Math.round(file.size / 1024);

        reader.onload = (e) => {
            img.onload = () => {
                const origW = img.width, origH = img.height;

                // ── Step 1: Detect WebP support ──
                const testCanvas = document.createElement("canvas");
                testCanvas.width = 1; testCanvas.height = 1;
                const supportsWebP = testCanvas.toDataURL("image/webp").startsWith("data:image/webp");
                const format = supportsWebP ? "image/webp" : "image/jpeg";
                const formatLabel = supportsWebP ? "WebP" : "JPEG";
                const headerLen = supportsWebP ? "data:image/webp;base64,".length : "data:image/jpeg;base64,".length;

                // ── Step 2: Smart scaling — preserve text readability ──
                // Invoice photos need ~800px to remain legible
                // Larger photos scaled proportionally, small photos untouched
                const MAX_LONG = 1000; // max dimension for 40KB target
                const MIN_READABLE = 500; // minimum for text readability
                let w = origW, h = origH;
                const longSide = Math.max(w, h);

                if (longSide > MAX_LONG) {
                    const scale = MAX_LONG / longSide;
                    w = Math.round(w * scale);
                    h = Math.round(h * scale);
                }
                // Ensure minimum readability
                if (Math.max(w, h) < MIN_READABLE && longSide >= MIN_READABLE) {
                    const scale = MIN_READABLE / Math.max(w, h);
                    w = Math.round(w * scale);
                    h = Math.round(h * scale);
                }

                const canvas = document.createElement("canvas");
                canvas.width = w; canvas.height = h;
                const ctx = canvas.getContext("2d");

                // ── Step 3: High-quality downscale (multi-step for sharpness) ──
                if (origW > w * 2 || origH > h * 2) {
                    // Step-down resize for better quality (avoid blurry downscale)
                    const tmp = document.createElement("canvas");
                    let sw = origW, sh = origH;
                    const tmpCtx = tmp.getContext("2d");
                    // First pass: half-size steps until close to target
                    while (sw > w * 2 || sh > h * 2) {
                        sw = Math.round(sw / 2);
                        sh = Math.round(sh / 2);
                    }
                    tmp.width = sw; tmp.height = sh;
                    tmpCtx.drawImage(img, 0, 0, sw, sh);
                    // Final pass to exact target
                    ctx.imageSmoothingEnabled = true;
                    ctx.imageSmoothingQuality = "high";
                    ctx.drawImage(tmp, 0, 0, sw, sh, 0, 0, w, h);
                } else {
                    ctx.imageSmoothingEnabled = true;
                    ctx.imageSmoothingQuality = "high";
                    ctx.drawImage(img, 0, 0, w, h);
                }

                // ── Step 4: Optional sharpening for text documents ──
                // Light unsharp mask to keep invoice text crisp after resize
                const applySharpening = (strength = 0.3) => {
                    try {
                        const imageData = ctx.getImageData(0, 0, w, h);
                        const d = imageData.data;
                        const copy = new Uint8ClampedArray(d);
                        const stride = w * 4;
                        for (let y = 1; y < h - 1; y++) {
                            for (let x = 1; x < w - 1; x++) {
                                const idx = (y * w + x) * 4;
                                for (let c = 0; c < 3; c++) {
                                    // Laplacian kernel
                                    const lap = -copy[idx - stride + c] - copy[idx - 4 + c]
                                        + 4 * copy[idx + c]
                                        - copy[idx + 4 + c] - copy[idx + stride + c];
                                    d[idx + c] = Math.min(255, Math.max(0, copy[idx + c] + strength * lap));
                                }
                            }
                        }
                        ctx.putImageData(imageData, 0, 0);
                    } catch (e) { /* ignore CORS or other issues */ }
                };
                // Only sharpen if significantly downsized (text might blur)
                if (origW > w * 1.5) applySharpening(0.25);

                // ── Step 5: Binary search for optimal quality ──
                const calcSize = (dataUrl) => Math.round((dataUrl.length - headerLen) * 3 / 4 / 1024);

                // Quality ranges differ by format
                let lo = supportsWebP ? 0.15 : 0.2;
                let hi = supportsWebP ? 0.85 : 0.8;
                let bestData = "";
                let bestSize = 0;
                let bestQuality = 0;

                // 10 iterations of binary search
                for (let i = 0; i < 10; i++) {
                    const mid = (lo + hi) / 2;
                    const data = canvas.toDataURL(format, mid);
                    const size = calcSize(data);
                    bestData = data;
                    bestSize = size;
                    bestQuality = mid;
                    if (size > targetKB) hi = mid;
                    else lo = mid;
                }

                // ── Step 6: If still too large, progressive resize ──
                let finalW = w, finalH = h;
                if (bestSize > targetKB * 1.5) {
                    // Try 75% size
                    const scales = [0.75, 0.6, 0.5];
                    for (const s of scales) {
                        const nw = Math.round(w * s), nh = Math.round(h * s);
                        if (Math.max(nw, nh) < MIN_READABLE) break; // don't go below readable
                        canvas.width = nw; canvas.height = nh;
                        ctx.imageSmoothingEnabled = true;
                        ctx.imageSmoothingQuality = "high";
                        ctx.drawImage(img, 0, 0, nw, nh);
                        const minQ = supportsWebP ? 0.3 : 0.35;
                        const data = canvas.toDataURL(format, minQ);
                        const size = calcSize(data);
                        bestData = data; bestSize = size;
                        finalW = nw; finalH = nh;
                        bestQuality = minQ;
                        if (size <= targetKB) break;
                    }
                }

                // ── Step 7: Also generate thumbnail for list view ──
                const THUMB_SIZE = 80;
                const thumbCanvas = document.createElement("canvas");
                let tw = THUMB_SIZE, th = THUMB_SIZE;
                if (origW > origH) { th = Math.round(origH * THUMB_SIZE / origW); }
                else { tw = Math.round(origW * THUMB_SIZE / origH); }
                thumbCanvas.width = tw; thumbCanvas.height = th;
                const tCtx = thumbCanvas.getContext("2d");
                tCtx.imageSmoothingEnabled = true;
                tCtx.imageSmoothingQuality = "high";
                tCtx.drawImage(img, 0, 0, tw, th);
                const thumbData = thumbCanvas.toDataURL(format, supportsWebP ? 0.5 : 0.5);
                const thumbSizeKB = calcSize(thumbData);

                const ratio = originalSizeKB > 0 ? Math.round((1 - bestSize / originalSizeKB) * 100) : 0;

                resolve({
                    data: bestData,           // full compressed image (for detail view)
                    thumb: thumbData,         // tiny thumbnail (for list view)
                    sizeKB: bestSize,
                    thumbKB: thumbSizeKB,
                    originalKB: originalSizeKB,
                    width: finalW || w,
                    height: finalH || h,
                    origWidth: origW,
                    origHeight: origH,
                    format: formatLabel,
                    quality: Math.round(bestQuality * 100),
                    ratio,                    // compression ratio %
                });
            };
            img.onerror = () => reject(new Error("Không thể đọc ảnh"));
            img.src = e.target.result;
        };
        reader.onerror = () => reject(new Error("Không thể đọc file"));
        reader.readAsDataURL(file);
    });
}

const MOCK_TRANSACTIONS = [
    { id: "tx1", type: "income", amount: 45000000, description: "Doanh thu tháng 1", tx_date: "2026-01-31", category_id: "c1", category_name: "Doanh thu bán hàng", payment_method: "cash", has_invoice: false, status: "confirmed", counterparty: "Khách lẻ", reconciled: true, vat_group: "service" },
    { id: "tx2", type: "income", amount: 52000000, description: "Doanh thu tháng 2", tx_date: "2026-02-28", category_id: "c1", category_name: "Doanh thu bán hàng", payment_method: "bank_transfer", has_invoice: false, status: "confirmed", counterparty: "Khách lẻ", reconciled: false, vat_group: "service" },
    { id: "tx3", type: "income", amount: 48000000, description: "Doanh thu tháng 3", tx_date: "2026-03-31", category_id: "c1", category_name: "Doanh thu bán hàng", payment_method: "bank_transfer", has_invoice: false, status: "confirmed", counterparty: "Khách lẻ", reconciled: false, vat_group: "service" },
    { id: "tx4", type: "income", amount: 5000000, description: "Catering đám cưới", tx_date: "2026-02-15", category_id: "c2", category_name: "Doanh thu dịch vụ", payment_method: "bank_transfer", has_invoice: true, status: "confirmed", counterparty: "Nguyễn Văn A", reconciled: false, vat_group: "service" },
    { id: "tx5", type: "expense", amount: 30000000, description: "Mua nguyên liệu T1", tx_date: "2026-01-15", category_id: "c10", category_name: "Nguyên vật liệu", payment_method: "bank_transfer", has_invoice: true, status: "confirmed", counterparty: "Chợ đầu mối", reconciled: false },
    { id: "tx6", type: "expense", amount: 28000000, description: "Mua nguyên liệu T2", tx_date: "2026-02-15", category_id: "c10", category_name: "Nguyên vật liệu", payment_method: "bank_transfer", has_invoice: true, status: "confirmed", counterparty: "Chợ đầu mối", reconciled: false },
    { id: "tx7", type: "expense", amount: 15000000, description: "Thuê mặt bằng Q1", tx_date: "2026-01-10", category_id: "c12", category_name: "Thuê mặt bằng", payment_method: "bank_transfer", has_invoice: true, status: "confirmed", counterparty: "Chủ nhà", reconciled: false },
    { id: "tx8", type: "expense", amount: 8000000, description: "Lương nhân viên T2", tx_date: "2026-02-01", category_id: "c11", category_name: "Nhân công", payment_method: "cash", has_invoice: false, status: "confirmed", counterparty: "NV Lan", reconciled: false },
    { id: "tx9", type: "expense", amount: 2200000, description: "Tiền điện nước T3", tx_date: "2026-03-05", category_id: "c13", category_name: "Điện nước", payment_method: "bank_transfer", has_invoice: true, status: "confirmed", counterparty: "EVN", reconciled: false },
    { id: "tx10", type: "expense", amount: 2500000, description: "Sửa bếp gas", tx_date: "2026-03-18", category_id: "c16", category_name: "Bảo trì/Sửa chữa", payment_method: "cash", has_invoice: false, status: "confirmed", counterparty: "Thợ sửa", reconciled: false },
];

const MOCK_BANK_ENTRIES = [
    { id: "bk1", date: "2026-03-05", amount: -2200000, description: "CK Tien dien nuoc thang 3 EVN", matched: false },
    { id: "bk2", date: "2026-02-16", amount: 5000000, description: "CK tu Nguyen Van A catering", matched: false },
    { id: "bk3", date: "2026-02-15", amount: -28000000, description: "CK Mua nguyen lieu Cho dau moi T2", matched: false },
    { id: "bk4", date: "2026-01-15", amount: -30000000, description: "CK Nguyen lieu T1 Cho dau moi", matched: false },
    { id: "bk5", date: "2026-01-10", amount: -15000000, description: "CK Thue mat bang Q1 Chu nha", matched: false },
    { id: "bk6", date: "2026-02-28", amount: 52000000, description: "CK Doanh thu T2 ban hang", matched: false },
    { id: "bk7", date: "2026-03-31", amount: 48000000, description: "CK Doanh thu T3", matched: false },
    { id: "bk8", date: "2026-03-22", amount: -4800000, description: "CK Phi van chuyen hang hoa", matched: false },
];

const MOCK_INVENTORY = [
    {
        id: "inv1", name: "Bánh phở", unit: "kg", opening_qty: 50, opening_value: 500000, movements: [
            { id: "m1", date: "2026-01-15", type: "in", doc: "HD001", desc: "Mua NVL T1", qty: 200, price: 12000 },
            { id: "m2", date: "2026-01-20", type: "out", doc: "XK001", desc: "Xuất bán T1", qty: 180, price: 0 },
            { id: "m3", date: "2026-02-10", type: "in", doc: "HD005", desc: "Mua NVL T2", qty: 250, price: 11500 },
            { id: "m4", date: "2026-02-25", type: "out", doc: "XK002", desc: "Xuất bán T2", qty: 220, price: 0 },
            { id: "m5", date: "2026-03-08", type: "in", doc: "HD009", desc: "Mua NVL T3", qty: 200, price: 12500 },
            { id: "m6", date: "2026-03-28", type: "out", doc: "XK003", desc: "Xuất bán T3", qty: 190, price: 0 },
        ]
    },
    {
        id: "inv2", name: "Thịt bò", unit: "kg", opening_qty: 10, opening_value: 2500000, movements: [
            { id: "m7", date: "2026-01-12", type: "in", doc: "HD002", desc: "Mua thịt bò T1", qty: 30, price: 280000 },
            { id: "m8", date: "2026-01-31", type: "out", doc: "XK004", desc: "Xuất dùng T1", qty: 28, price: 0 },
            { id: "m9", date: "2026-02-12", type: "in", doc: "HD006", desc: "Mua thịt bò T2", qty: 35, price: 275000 },
            { id: "m10", date: "2026-02-28", type: "out", doc: "XK005", desc: "Xuất dùng T2", qty: 32, price: 0 },
        ]
    },
    {
        id: "inv3", name: "Hành lá", unit: "bó", opening_qty: 20, opening_value: 200000, movements: [
            { id: "m11", date: "2026-01-10", type: "in", doc: "HD003", desc: "Mua hành T1", qty: 100, price: 8000 },
            { id: "m12", date: "2026-01-31", type: "out", doc: "XK006", desc: "Xuất dùng T1", qty: 95, price: 0 },
            { id: "m13", date: "2026-02-10", type: "in", doc: "HD007", desc: "Mua hành T2", qty: 120, price: 9000 },
            { id: "m14", date: "2026-03-15", type: "out", doc: "XK007", desc: "Xuất dùng T2-T3", qty: 130, price: 0 },
        ]
    },
];

// ─── Inventory calculation (S2d weighted average) ────────────────────────────
function calcInventory(item) {
    let qty = item.opening_qty, val = item.opening_value;
    const rows = [];
    item.movements.forEach(m => {
        const avgPrice = qty > 0 ? val / qty : 0;
        if (m.type === "in") {
            const inVal = m.qty * m.price;
            qty += m.qty; val += inVal;
            rows.push({ ...m, unitPrice: m.price, inQty: m.qty, inVal, outQty: 0, outVal: 0, stockQty: qty, stockVal: val });
        } else {
            const outPrice = qty > 0 ? val / qty : 0; // weighted average
            const outQty = Math.min(m.qty, qty);
            const outVal = Math.round(outQty * outPrice);
            qty -= outQty; val -= outVal;
            rows.push({ ...m, unitPrice: Math.round(outPrice), inQty: 0, inVal: 0, outQty, outVal, stockQty: qty, stockVal: val });
        }
    });
    return { rows, endQty: qty, endVal: val };
}

// ─── CSV/HTML Export Engine (TT152/2025/TT-BTC exact templates) ──────────────

function downloadCSV(filename, csvContent) {
    const BOM = "\uFEFF";
    const csvData = BOM + csvContent;
    // Method 1: Blob + link (works in most environments)
    try {
        const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a"); a.href = url; a.download = filename;
        a.style.display = "none"; document.body.appendChild(a); a.click();
        setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url) }, 200);
        return true;
    } catch (e1) {
        // Method 2: Data URI fallback
        try {
            const encoded = encodeURIComponent(csvData);
            const a = document.createElement("a"); a.href = "data:text/csv;charset=utf-8," + encoded; a.download = filename;
            a.style.display = "none"; document.body.appendChild(a); a.click();
            setTimeout(() => document.body.removeChild(a), 200);
            return true;
        } catch (e2) {
            // Method 3: Copy to clipboard as last resort
            try { navigator.clipboard.writeText(csvContent); } catch (e3) { }
            return false;
        }
    }
}

function openPrintHTML(title, htmlBody, business, opts = {}) {
    const mauSo = opts.mauSo || "S1a-HKD";
    const kyKhai = opts.kyKhai || "Quý .../năm 2026";
    const dvTinh = opts.dvTinh || "VNĐ";
    const soTitle = opts.soTitle || title;
    const fullHTML = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${title}</title>
<style>
body{font-family:'Times New Roman',serif;margin:30px 35px;font-size:13px;color:#000;line-height:1.5}
table{width:100%;border-collapse:collapse;margin:16px 0}
th,td{border:1px solid #000;padding:5px 8px;font-size:12px}
th{background:#f0f0f0;font-weight:bold;text-align:center}
td.num{text-align:right;font-family:'Courier New',monospace}
td.center{text-align:center}
.total-row{font-weight:bold;background:#f9f9f9}
.note{font-size:11px;font-style:italic;margin-top:10px}
.tt-header{display:flex;justify-content:space-between;margin-bottom:8px;border-bottom:1px solid #000;padding-bottom:10px}
.tt-left{font-size:12px;flex:1}
.tt-left b{font-size:13px}
.tt-right{text-align:right;font-size:11.5px;min-width:260px}
.tt-right .mau-so{font-weight:bold;font-size:13px;margin-bottom:2px}
.tt-right .italic{font-style:italic;line-height:1.4}
.tt-title{text-align:center;margin:14px 0 6px;font-size:17px;font-weight:bold;text-transform:uppercase;letter-spacing:1px}
.tt-meta{text-align:center;font-size:12px;margin-bottom:16px;line-height:1.8}
.tt-meta .dvt{text-align:right;font-style:italic;margin-top:4px}
.footer{margin-top:30px;display:flex;justify-content:space-between;font-size:12px}
.footer-col{text-align:center;min-width:200px}
.sign-line{margin-top:60px;font-weight:bold}
.no-print{margin:0 0 20px;padding:10px 16px;background:#f0f0f0;border-radius:6px;display:flex;align-items:center;gap:12;font-size:13px}
.no-print button{padding:8px 20px;border:none;border-radius:4px;font-weight:bold;cursor:pointer;font-size:13px;font-family:'Times New Roman',serif}
.no-print .btn-print{background:#1a3a5c;color:white}
.no-print .btn-close{background:#e0e0e0;color:#333}
@media print{.no-print{display:none!important}body{margin:15px}@page{size:A4;margin:14mm}}
</style></head><body>
<div class="no-print">
  <button class="btn-print" onclick="window.print()">🖨️ In / Lưu PDF (Ctrl+P)</button>
  <button class="btn-close" onclick="window.close()">✕ Đóng</button>
  <span style="flex:1;text-align:right;color:#666;font-style:italic">${title}</span>
</div>
<div class="tt-header">
  <div class="tt-left">
    <b>HỘ, CÁ NHÂN KINH DOANH:</b> ${business.name || "..................."}<br>
    Địa chỉ: ${business.address || "................................."}<br>
    Mã số thuế: <span style="letter-spacing:1px;font-weight:bold">${business.tax_id || "..........................."}</span>
  </div>
  <div class="tt-right">
    <div class="mau-so">Mẫu số ${mauSo}</div>
    <div class="italic">(Kèm theo Thông tư số 152/2025/TT-BTC<br>ngày 31 tháng 12 năm 2025 của Bộ trưởng<br>Bộ Tài chính)</div>
  </div>
</div>
<div class="tt-title">${soTitle}</div>
<div class="tt-meta">
  Địa điểm kinh doanh: ${business.address || "....................."}<br>
  Kỳ khai thuế: ${kyKhai}
  <div class="dvt">Đơn vị tính: ${dvTinh}</div>
</div>
${htmlBody}
<div class="footer">
  <div class="footer-col">Người ghi sổ<div class="sign-line">&nbsp;</div></div>
  <div class="footer-col">Ngày ..... tháng ..... năm 2026<br>Người đại diện HKD<div class="sign-line">${business.name || ""}</div></div>
</div>
</body></html>`;

    // Try multiple methods to open print view
    // Method 1: window.open (standard)
    try {
        const w = window.open("", "_blank");
        if (w && !w.closed) { w.document.write(fullHTML); w.document.close(); return; }
    } catch (e) { }
    // Method 2: iframe overlay (works in sandboxed environments)
    try {
        const iframeId = "print-overlay-" + Date.now();
        const iframe = document.createElement("iframe");
        iframe.id = iframeId;
        iframe.style.cssText = "position:fixed;top:0;left:0;width:100vw;height:100vh;border:none;z-index:99999;background:white";
        document.body.appendChild(iframe);
        const doc = iframe.contentDocument || iframe.contentWindow.document;
        const closeScript = `<script>function closePrintOverlay(){window.parent.document.getElementById('${iframeId}').remove()}<\/script>`;
        const closeableHTML = fullHTML.replace(
            'onclick="window.close()"',
            'onclick="closePrintOverlay()"'
        ).replace('</head>', closeScript + '</head>');
        doc.open(); doc.write(closeableHTML); doc.close();
    } catch (e2) {
        console.error("Print failed:", e2);
    }
}

function exportS1a(transactions, business) {
    const incomes = transactions.filter(t => t.type === "income").sort((a, b) => a.tx_date.localeCompare(b.tx_date));
    // CSV
    let csv = "STT,Ngày tháng,Số chứng từ,Diễn giải,Doanh thu (VNĐ)\n";
    let total = 0;
    incomes.forEach((t, i) => {
        csv += `${i + 1},${fmtDate(t.tx_date)},${t.has_invoice ? "HĐ" : ""},${t.description},${t.amount}\n`;
        total += t.amount;
    });
    csv += `,,,,\n,,,Cộng kỳ,${total}\n`;
    downloadCSV(`S1a-HKD_${business.tax_id}_Q1-2026.csv`, csv);
    // HTML
    let rows = incomes.map((t, i) =>
        `<tr><td class="center">${i + 1}</td><td class="center">${fmtDate(t.tx_date)}</td><td class="center">${t.has_invoice ? "HĐ" : ""}</td><td>${t.description}</td><td class="num">${fmt(t.amount)}</td></tr>`
    ).join("");
    rows += `<tr class="total-row"><td colspan="4" style="text-align:right">Cộng kỳ:</td><td class="num">${fmt(total)}</td></tr>`;
    openPrintHTML("S1a-HKD — Sổ doanh thu bán hàng", `
    <table><thead><tr><th style="width:40px">STT</th><th style="width:100px">Ngày tháng</th><th style="width:80px">Số CT</th><th>Diễn giải</th><th style="width:140px">Doanh thu (VNĐ)</th></tr></thead><tbody>${rows}</tbody></table>
    <p class="note">Ghi chú: Sổ này dùng cho HKD doanh thu ≤ 500 triệu/năm, không chịu thuế GTGT, không nộp thuế TNCN.</p>`, business, { mauSo: "S1a-HKD", soTitle: "SỔ DOANH THU BÁN HÀNG HÓA, DỊCH VỤ", kyKhai: "Quý 1/2026" });
}

function exportS2b(transactions, business) {
    const incomes = transactions.filter(t => t.type === "income").sort((a, b) => a.tx_date.localeCompare(b.tx_date));
    const grouped = {};
    VAT_GROUPS.forEach(g => { grouped[g.id] = { group: g, txs: [], revenue: 0, vat: 0 }; });
    incomes.forEach(t => { const gid = t.vat_group || business.default_vat_group; if (grouped[gid]) { grouped[gid].txs.push(t); grouped[gid].revenue += t.amount; grouped[gid].vat += Math.round(t.amount * grouped[gid].group.rate); } });
    // CSV
    let csv = "Số CT (A),Ngày tháng (B),Diễn giải (C),Doanh thu (1),Tỷ lệ VAT,VAT phải nộp\n";
    let totalRev = 0, totalVat = 0;
    Object.values(grouped).filter(g => g.revenue > 0).forEach(g => {
        csv += `,,--- Nhóm: ${g.group.label} (VAT ${g.group.rateLabel}) ---,,,\n`;
        g.txs.forEach(t => {
            const vat = Math.round(t.amount * g.group.rate);
            csv += `${t.has_invoice ? "HĐ" : ""},${fmtDate(t.tx_date)},${t.description},${t.amount},${g.group.rateLabel},${vat}\n`;
        });
        csv += `,,Cộng nhóm ${g.group.label},${g.revenue},,${g.vat}\n`;
        totalRev += g.revenue; totalVat += g.vat;
    });
    csv += `\n,,TỔNG CỘNG,${totalRev},,${totalVat}\n`;
    downloadCSV(`S2b-HKD_${business.tax_id}_Q1-2026.csv`, csv);
    // HTML
    let htmlRows = "";
    Object.values(grouped).filter(g => g.revenue > 0).forEach(g => {
        htmlRows += `<tr style="background:#f5f5f5"><td colspan="6" style="font-weight:bold;border:1px solid #000;padding:6px 8px">Nhóm ngành: ${g.group.icon} ${g.group.label} — Tỷ lệ VAT: ${g.group.rateLabel}</td></tr>`;
        g.txs.forEach(t => {
            const vat = Math.round(t.amount * g.group.rate);
            htmlRows += `<tr><td class="center">${t.has_invoice ? "HĐ" : ""}</td><td class="center">${fmtDate(t.tx_date)}</td><td>${t.description}</td><td class="num">${fmt(t.amount)}</td><td class="center">${g.group.rateLabel}</td><td class="num">${fmt(vat)}</td></tr>`;
        });
        htmlRows += `<tr class="total-row"><td colspan="3" style="text-align:right">Cộng nhóm:</td><td class="num">${fmt(g.revenue)}</td><td></td><td class="num">${fmt(g.vat)}</td></tr>`;
    });
    htmlRows += `<tr class="total-row" style="background:#e8e8e8"><td colspan="3" style="text-align:right;font-weight:bold">TỔNG CỘNG:</td><td class="num">${fmt(totalRev)}</td><td></td><td class="num">${fmt(totalVat)}</td></tr>`;
    openPrintHTML("S2b-HKD — Sổ doanh thu theo nhóm VAT", `
    <table><thead><tr><th style="width:60px">Số CT (A)</th><th style="width:90px">Ngày (B)</th><th>Diễn giải (C)</th><th style="width:130px">Doanh thu (1)</th><th style="width:70px">Tỷ lệ %</th><th style="width:130px">VAT phải nộp</th></tr></thead><tbody>${htmlRows}</tbody></table>`, business, { mauSo: "S2b-HKD", soTitle: "SỔ DOANH THU BÁN HÀNG HÓA, DỊCH VỤ<br><span style='font-size:14px;font-weight:normal;font-style:italic'>Theo nhóm ngành nghề có cùng tỷ lệ % tính thuế GTGT</span>", kyKhai: "Quý 1/2026" });
}

function exportS2c(transactions, business, expenseCategories) {
    const incomes = transactions.filter(t => t.type === "income").sort((a, b) => a.tx_date.localeCompare(b.tx_date));
    const expenses = transactions.filter(t => t.type === "expense").sort((a, b) => a.tx_date.localeCompare(b.tx_date));
    const revenue = incomes.reduce((s, t) => s + t.amount, 0);
    const deductibleTxs = expenses.filter(t => t.has_invoice);
    const deductible = deductibleTxs.reduce((s, t) => s + t.amount, 0);
    const nondeductible = expenses.filter(t => !t.has_invoice).reduce((s, t) => s + t.amount, 0);
    const profit = revenue - deductible;

    // Build category → s2c_group lookup
    const catLookup = {};
    (expenseCategories || []).forEach(c => { if (c.s2c_group) catLookup[c.id] = c.s2c_group; });

    // Group deductible expenses by S2c groups
    const groups = S2C_GROUPS.map(g => {
        const txs = deductibleTxs.filter(t => catLookup[t.category_id] === g.code);
        return { ...g, txs, total: txs.reduce((s, t) => s + t.amount, 0) };
    });
    // Unclassified → "e"
    const unclassified = deductibleTxs.filter(t => !catLookup[t.category_id]);
    if (unclassified.length > 0) {
        const eg = groups.find(g => g.code === "e");
        if (eg) { eg.txs = [...eg.txs, ...unclassified]; eg.total += unclassified.reduce((s, t) => s + t.amount, 0); }
    }

    // CSV with expense grouping
    let csv = "STT,Chỉ tiêu,Số tiền (VNĐ),Ghi chú\n";
    csv += `1,Tổng doanh thu bán hàng hóa dịch vụ,${revenue},${incomes.length} giao dịch\n`;
    csv += `2,Tổng chi phí hợp lý (có hóa đơn),${deductible},\n`;
    groups.forEach(g => {
        if (g.total > 0) csv += `,  ${g.code}) ${g.shortLabel},${g.total},${g.txs.length} giao dịch\n`;
    });
    csv += `3,Chi phí không hợp lệ (không HĐ),${nondeductible},\n`;
    csv += `4,Thu nhập tính thuế (1 - 2),${profit},\n`;
    downloadCSV(`S2c-HKD_${business.tax_id}_Q1-2026.csv`, csv);

    // HTML — S2c official format
    let expRows = "";
    groups.forEach(g => {
        const hasData = g.total > 0;
        expRows += `<tr style="background:${g.bg}"><td class="center" style="font-weight:bold">${g.code})</td>
      <td style="font-weight:600;font-size:11px">${g.label}</td>
      <td class="num" style="font-weight:bold">${hasData ? fmt(g.total) : "—"}</td>
      <td style="font-size:11px;color:#666">${hasData ? g.txs.length + " GD" : ""}</td></tr>`;
        if (hasData) {
            g.txs.forEach(t => {
                expRows += `<tr><td></td><td style="padding-left:24px;font-size:11px">${fmtDate(t.tx_date)} — ${t.description}${t.counterparty ? " (" + t.counterparty + ")" : ""}</td><td class="num" style="font-size:11px">${fmt(t.amount)}</td><td class="center" style="font-size:11px">${t.has_invoice ? "HĐ" : ""}</td></tr>`;
            });
        }
    });

    openPrintHTML("S2c-HKD — Sổ chi tiết doanh thu, chi phí", `
    <table><thead><tr><th style="width:40px">STT</th><th>Chỉ tiêu</th><th style="width:150px">Số tiền (VNĐ)</th><th style="width:100px">Ghi chú</th></tr></thead><tbody>
    <tr style="background:#edfaf3"><td class="center" style="font-weight:bold">1</td><td style="font-weight:bold">Doanh thu bán hàng hóa, dịch vụ</td><td class="num" style="font-weight:bold">${fmt(revenue)}</td><td style="font-size:11px">${incomes.length} GD</td></tr>
    ${incomes.map(t => `<tr><td></td><td style="padding-left:20px;font-size:11px">${fmtDate(t.tx_date)} — ${t.description}</td><td class="num" style="font-size:11px">${fmt(t.amount)}</td><td></td></tr>`).join("")}
    <tr style="background:#fff0f0"><td class="center" style="font-weight:bold">2</td><td style="font-weight:bold">Chi phí hợp lý được khấu trừ</td><td class="num" style="font-weight:bold">${fmt(deductible)}</td><td style="font-size:11px">Có HĐ/CT</td></tr>
    ${expRows}
    <tr style="background:#fff5f5"><td class="center">3</td><td>Chi phí không hợp lệ (không có hóa đơn, chứng từ)</td><td class="num" style="color:red">${fmt(nondeductible)}</td><td style="font-size:11px">Không khấu trừ</td></tr>
    <tr class="total-row" style="background:#f0f0f5"><td class="center" style="font-weight:bold">4</td><td style="font-weight:bold">Chênh lệch thu chi = (1) − (2)</td><td class="num" style="font-weight:bold">${fmt(profit)}</td><td style="font-size:11px">Căn cứ tính PIT</td></tr>
    </tbody></table>
    <p class="note">Hộ kinh doanh tính chênh lệch giữa tổng doanh thu và tổng chi phí hợp lý để làm căn cứ tính thuế TNCN phải nộp theo quy định tại TT152/2025/TT-BTC.</p>`, business, { mauSo: "S2c-HKD", soTitle: "SỔ CHI TIẾT DOANH THU, CHI PHÍ", kyKhai: "Quý 1/2026" });
}

function exportS2d(inventory, business) {
    let csv = "Tên hàng hóa,Số CT (A),Ngày (B),Diễn giải (C),ĐVT (D),Đơn giá (1),SL nhập (2),Thành tiền nhập (3),SL xuất (4),Thành tiền xuất (5),SL tồn (6),Thành tiền tồn (7)\n";
    let htmlGroups = "";
    inventory.forEach(item => {
        const { rows, endQty, endVal } = calcInventory(item);
        csv += `${item.name},,Tồn đầu kỳ,,${item.unit},${item.opening_qty > 0 ? Math.round(item.opening_value / item.opening_qty) : 0},,,,,${item.opening_qty},${item.opening_value}\n`;
        rows.forEach(r => {
            csv += `,${r.doc},${fmtDate(r.date)},${r.desc},${item.unit},${r.unitPrice},${r.inQty || ""},${r.inVal || ""},${r.outQty || ""},${r.outVal || ""},${r.stockQty},${r.stockVal}\n`;
        });
        csv += `,,Cộng kỳ,,,,${rows.reduce((s, r) => s + r.inQty, 0)},${rows.reduce((s, r) => s + r.inVal, 0)},${rows.reduce((s, r) => s + r.outQty, 0)},${rows.reduce((s, r) => s + r.outVal, 0)},${endQty},${endVal}\n\n`;
        // HTML for this item
        let trs = `<tr style="background:#f5f5f5;font-weight:bold"><td colspan="2">Tồn đầu kỳ</td><td></td><td class="center">${item.unit}</td><td class="num">${item.opening_qty > 0 ? fmt(Math.round(item.opening_value / item.opening_qty)) : ""}</td><td></td><td></td><td></td><td></td><td class="num">${item.opening_qty}</td><td class="num">${fmt(item.opening_value)}</td></tr>`;
        rows.forEach(r => {
            trs += `<tr><td class="center">${r.doc}</td><td class="center">${fmtDate(r.date)}</td><td>${r.desc}</td><td class="center">${item.unit}</td><td class="num">${fmt(r.unitPrice)}</td>
      <td class="num">${r.inQty || ""}</td><td class="num">${r.inVal ? fmt(r.inVal) : ""}</td><td class="num">${r.outQty || ""}</td><td class="num">${r.outVal ? fmt(r.outVal) : ""}</td><td class="num">${r.stockQty}</td><td class="num">${fmt(r.stockVal)}</td></tr>`;
        });
        trs += `<tr class="total-row"><td colspan="4" style="text-align:right">Cộng kỳ / Tồn cuối kỳ:</td><td></td><td class="num">${rows.reduce((s, r) => s + r.inQty, 0)}</td><td class="num">${fmt(rows.reduce((s, r) => s + r.inVal, 0))}</td><td class="num">${rows.reduce((s, r) => s + r.outQty, 0)}</td><td class="num">${fmt(rows.reduce((s, r) => s + r.outVal, 0))}</td><td class="num">${endQty}</td><td class="num">${fmt(endVal)}</td></tr>`;
        htmlGroups += `<h3 style="text-align:left;margin-top:20px">Tên hàng hóa: <strong>${item.name}</strong> — ĐVT: ${item.unit}</h3>
    <table style="font-size:11px"><thead><tr><th>Số CT (A)</th><th>Ngày (B)</th><th>Diễn giải (C)</th><th>ĐVT (D)</th><th>Đ.giá (1)</th><th>SL nhập (2)</th><th>T.tiền (3)</th><th>SL xuất (4)</th><th>T.tiền (5)</th><th>SL tồn (6)</th><th>T.tiền (7)</th></tr></thead><tbody>${trs}</tbody></table>`;
    });
    downloadCSV(`S2d-HKD_${business.tax_id}_Q1-2026.csv`, csv);
    openPrintHTML("S2d-HKD — Sổ chi tiết vật liệu, hàng hóa", `
    <p class="note">Phương pháp: Đơn giá xuất kho bình quân = (Giá trị tồn đầu kỳ + Giá trị nhập trong kỳ) / (SL tồn đầu kỳ + SL nhập trong kỳ)</p>
    ${htmlGroups}`, business, { mauSo: "S2d-HKD", soTitle: "SỔ CHI TIẾT VẬT LIỆU, DỤNG CỤ, SẢN PHẨM, HÀNG HÓA", kyKhai: "Quý 1/2026" });
}

function exportS2e(transactions, business) {
    const cashTx = transactions.filter(t => t.payment_method === "cash").sort((a, b) => a.tx_date.localeCompare(b.tx_date));
    const bankTx = transactions.filter(t => t.payment_method === "bank_transfer").sort((a, b) => a.tx_date.localeCompare(b.tx_date));
    function buildSection(label, txs, openBal) {
        let bal = openBal, csvPart = "", htmlPart = "";
        csvPart += `\n--- ${label} ---\n`;
        csvPart += `Số CT (A),Ngày (B),Diễn giải (C),Thu/Gửi vào (1),Chi/Rút ra (2),Tồn/Dư\n`;
        csvPart += `,,,,,${openBal}\n`;
        htmlPart += `<tr style="background:#f5f5f5"><td colspan="5" style="font-weight:bold">${label} — Số dư đầu kỳ:</td><td class="num" style="font-weight:bold">${fmt(openBal)}</td></tr>`;
        txs.forEach(t => {
            const inAmt = t.type === "income" ? t.amount : 0;
            const outAmt = t.type === "expense" ? t.amount : 0;
            bal += inAmt - outAmt;
            csvPart += `${t.has_invoice ? "HĐ" : ""},${fmtDate(t.tx_date)},${t.description},${inAmt || ""},${outAmt || ""},${bal}\n`;
            htmlPart += `<tr><td class="center">${t.has_invoice ? "HĐ" : ""}</td><td class="center">${fmtDate(t.tx_date)}</td><td>${t.description}</td><td class="num">${inAmt ? fmt(inAmt) : ""}</td><td class="num">${outAmt ? fmt(outAmt) : ""}</td><td class="num">${fmt(bal)}</td></tr>`;
        });
        csvPart += `,,Tồn cuối kỳ,,,${bal}\n`;
        htmlPart += `<tr class="total-row"><td colspan="5" style="text-align:right">Tồn / Dư cuối kỳ:</td><td class="num">${fmt(bal)}</td></tr>`;
        return { csvPart, htmlPart, endBal: bal };
    }
    const cash = buildSection("TIỀN MẶT", cashTx, business.cash_balance);
    const bank = buildSection("TIỀN GỬI NGÂN HÀNG", bankTx, business.bank_balance);
    let csv = "SỔ CHI TIẾT TIỀN — S2e-HKD\nSố CT (A),Ngày (B),Diễn giải (C),Thu/Gửi vào (1),Chi/Rút ra (2),Tồn/Dư\n";
    csv += cash.csvPart + bank.csvPart;
    downloadCSV(`S2e-HKD_${business.tax_id}_Q1-2026.csv`, csv);
    openPrintHTML("S2e-HKD — Sổ chi tiết tiền", `
    <table><thead><tr><th style="width:60px">Số CT (A)</th><th style="width:90px">Ngày (B)</th><th>Diễn giải (C)</th><th style="width:120px">Thu/Gửi vào (1)</th><th style="width:120px">Chi/Rút ra (2)</th><th style="width:120px">Tồn/Dư</th></tr></thead><tbody>
    ${cash.htmlPart}${bank.htmlPart}
    </tbody></table>`, business, { mauSo: "S2e-HKD", soTitle: "SỔ CHI TIẾT TIỀN", kyKhai: "Quý 1/2026" });
}

const DEFAULT_BUSINESS = {
    name: "Quán Phở Hương Lan",
    tax_id: "0123456789",
    address: "123 Nguyễn Huệ, Q1, TP.HCM",
    default_vat_group: "service",
    revenue_tier: "500m_3b",
    pit_method: "REVENUE_PERCENT",
    annual_revenue_estimate: 600000000,
    track_inventory: false,
    track_cash: true,
    cash_balance: 0,
    bank_balance: 0,
    // Invoice fields
    inv_phone: "",
    inv_email: "",
    inv_bank_account: "",
    inv_bank_name: "",
    inv_logo: null, // base64
    inv_serial: "2C26THH", // Ký hiệu HĐ (2: HĐ bán hàng có mã CQT, C: gốc, 26: năm, T: do HKD đăng ký, HH: tự đặt)
    inv_counter: 1, // số HĐ tiếp theo
    inv_note: "", // ghi chú mặc định trên HĐ
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

const fmt = (n) => new Intl.NumberFormat("vi-VN").format(n);
const fmtVND = (n) => fmt(n) + "đ";
const fmtDate = (d) => { const dt = new Date(d + "T00:00:00"); return dt.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" }); };
const fmtShortDate = (d) => { const dt = new Date(d + "T00:00:00"); return dt.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" }); };

function getRiskFlags(transactions) {
    const flags = [];
    const noInvoice = transactions.filter(t => t.type === "expense" && !t.has_invoice && t.amount >= 200000);
    if (noInvoice.length > 0) {
        const total = noInvoice.reduce((s, t) => s + t.amount, 0);
        flags.push({ code: "missing_invoices", severity: noInvoice.length > 3 ? "error" : "warning", title: "Thiếu hóa đơn", detail: `${noInvoice.length} giao dịch chi phí chưa có hóa đơn (tổng ${fmtVND(total)})`, count: noInvoice.length, amount: total });
    }
    const largeCash = transactions.filter(t => t.payment_method === "cash" && t.amount > 20000000);
    if (largeCash.length > 0) flags.push({ code: "large_cash", severity: "warning", title: "Giao dịch tiền mặt lớn", detail: `${largeCash.length} giao dịch tiền mặt > 20 triệu`, count: largeCash.length, amount: largeCash.reduce((s, t) => s + t.amount, 0) });
    const expense = transactions.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0);
    const noInvAmt = noInvoice.reduce((s, t) => s + t.amount, 0);
    const ratio = expense > 0 ? (noInvAmt / expense) * 100 : 0;
    if (ratio > 15) flags.push({ code: "high_no_invoice_ratio", severity: ratio > 30 ? "error" : "warning", title: "Tỷ lệ không HĐ cao", detail: `${ratio.toFixed(1)}% chi phí không có hóa đơn`, count: noInvoice.length, amount: noInvAmt });
    const unreconciled = transactions.filter(t => !t.reconciled && t.payment_method === "bank_transfer");
    if (unreconciled.length > 0) flags.push({ code: "unreconciled", severity: "warning", title: "Sao kê chưa khớp", detail: `${unreconciled.length} giao dịch ngân hàng chưa đối soát`, count: unreconciled.length, amount: unreconciled.reduce((s, t) => s + t.amount, 0) });
    return flags;
}
function getSmartSuggestions(tx, type, categories) { const r = tx.filter(t => t.type === type).slice(0, 10); const f = {}; r.forEach(t => { f[t.category_id] = (f[t.category_id] || 0) + 1; }); const s = Object.entries(f).sort((a, b) => b[1] - a[1]); const c = type === "income" ? categories.income : categories.expense; return s.slice(0, 3).map(([id]) => c.find(x => x.id === id)).filter(Boolean); }
function detectDuplicate(tx, n) { return tx.find(t => t.amount === n.amount && t.tx_date === n.tx_date && t.type === n.type); }

// ─── Styles ──────────────────────────────────────────────────────────────────

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');
:root {
  --bg: #FAFAF7; --bg-card: #FFFFFF; --bg-elevated: #F5F4F0; --bg-warm: #FFF8F0;
  --bg-sidebar: #1A1814; --bg-sidebar-hover: #2A2620; --bg-sidebar-active: #3A352E;
  --text-primary: #1A1814; --text-secondary: #6B6560; --text-tertiary: #9B9590;
  --text-inverse: #FAFAF7; --text-sidebar: #C8C2B8; --text-sidebar-active: #FFF8F0;
  --accent: #E85D2C; --accent-hover: #D14E20; --accent-light: #FFF0EA; --accent-glow: rgba(232,93,44,0.12);
  --green: #2D9F6F; --green-light: #EDFAF3; --red: #D94040; --red-light: #FFF0F0;
  --yellow: #E5A10E; --yellow-light: #FFF9EB; --blue: #3B7DD8; --blue-light: #EEF4FC;
  --border: #E8E4DE; --border-light: #F0ECE6;
  --radius-sm: 8px; --radius-md: 12px; --radius-lg: 16px; --radius-xl: 20px; --radius-full: 9999px;
  --shadow-sm: 0 1px 2px rgba(26,24,20,0.04); --shadow-md: 0 4px 12px rgba(26,24,20,0.06);
  --shadow-lg: 0 8px 32px rgba(26,24,20,0.08); --shadow-xl: 0 16px 48px rgba(26,24,20,0.12);
  --font: 'Be Vietnam Pro', -apple-system, sans-serif; --font-mono: 'Space Mono', monospace;
}
* { margin:0; padding:0; box-sizing:border-box; } html { font-size:15px; }
body { font-family:var(--font); background:var(--bg); color:var(--text-primary); -webkit-font-smoothing:antialiased; }
@keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
@keyframes fadeIn { from{opacity:0} to{opacity:1} }
@keyframes slideRight { from{opacity:0;transform:translateX(-20px)} to{opacity:1;transform:translateX(0)} }
@keyframes slideDown { from{opacity:0;transform:translateY(-8px);max-height:0} to{opacity:1;transform:translateY(0);max-height:500px} }
@keyframes countUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
@keyframes toastIn { from{opacity:0;transform:translateY(30px) scale(0.95)} to{opacity:1;transform:translateY(0) scale(1)} }
@keyframes toastOut { from{opacity:1;transform:translateY(0)} to{opacity:0;transform:translateY(-10px) scale(0.95)} }
@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
.fade-up{animation:fadeUp .5s ease-out both} .fade-in{animation:fadeIn .4s ease-out both} .slide-right{animation:slideRight .4s ease-out both}

.app-shell{display:flex;min-height:100vh;background:var(--bg)}
.sidebar{width:260px;min-height:100vh;background:var(--bg-sidebar);padding:24px 16px;display:flex;flex-direction:column;position:fixed;left:0;top:0;bottom:0;z-index:100;overflow-y:auto}
.sidebar-brand{display:flex;align-items:center;gap:12px;padding:8px 12px;margin-bottom:32px}
.sidebar-brand-icon{width:40px;height:40px;background:var(--accent);border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center;font-size:20px;color:white;font-weight:800;font-family:var(--font-mono)}
.sidebar-brand-text{color:var(--text-inverse);font-weight:700;font-size:1.05rem;letter-spacing:-.02em}
.sidebar-brand-sub{color:var(--text-sidebar);font-size:.7rem;font-weight:400;letter-spacing:.05em;text-transform:uppercase;margin-top:2px}
.sidebar-section{margin-bottom:24px}
.sidebar-section-label{color:var(--text-tertiary);font-size:.65rem;font-weight:600;text-transform:uppercase;letter-spacing:.1em;padding:0 12px;margin-bottom:8px}
.sidebar-item{display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:var(--radius-md);cursor:pointer;transition:all .15s ease;color:var(--text-sidebar);font-size:.9rem;font-weight:400;border:none;background:none;width:100%;text-align:left;position:relative}
.sidebar-item:hover{background:var(--bg-sidebar-hover);color:var(--text-sidebar-active)}
.sidebar-item.active{background:var(--bg-sidebar-active);color:var(--text-sidebar-active);font-weight:500}
.sidebar-item svg{width:20px;height:20px;opacity:.6;flex-shrink:0} .sidebar-item.active svg{opacity:1}
.sidebar-item .badge{margin-left:auto;background:var(--accent);color:white;font-size:.65rem;font-weight:700;padding:2px 7px;border-radius:var(--radius-full);min-width:20px;text-align:center}
.sidebar-business{margin-top:auto;padding:16px 12px;border-top:1px solid rgba(255,255,255,.06)}
.sidebar-business-name{color:var(--text-sidebar-active);font-weight:600;font-size:.85rem}
.sidebar-business-id{color:var(--text-tertiary);font-size:.72rem;font-family:var(--font-mono);margin-top:2px}
.sidebar-business:hover{background:var(--bg-sidebar-hover);border-radius:var(--radius-md)}

.main-content{flex:1;margin-left:260px;min-height:100vh;padding-bottom:40px}
.page-header{padding:28px 40px 0;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px}
.page-title{font-size:1.6rem;font-weight:800;letter-spacing:-.03em} .page-subtitle{color:var(--text-secondary);font-size:.85rem;margin-top:2px}
.page-body{padding:24px 40px 40px}

.card{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);overflow:hidden}
.card-glow{box-shadow:var(--shadow-md)}
.card-header{padding:20px 24px;border-bottom:1px solid var(--border-light);display:flex;align-items:center;justify-content:space-between}
.card-title{font-weight:700;font-size:.95rem;letter-spacing:-.01em} .card-body{padding:24px}

.stat-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:24px}
.stat-card{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:20px 22px;position:relative;overflow:hidden;transition:all .2s ease;animation:fadeUp .5s ease-out both}
.stat-card:hover{border-color:var(--accent);box-shadow:0 0 0 1px var(--accent),var(--shadow-md);transform:translateY(-2px)}
.stat-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px}
.stat-card.green::before{background:var(--green)} .stat-card.red::before{background:var(--red)} .stat-card.blue::before{background:var(--blue)} .stat-card.accent::before{background:var(--accent)} .stat-card.yellow::before{background:var(--yellow)}
.stat-label{font-size:.75rem;color:var(--text-secondary);font-weight:500;text-transform:uppercase;letter-spacing:.04em;margin-bottom:8px}
.stat-value{font-size:1.45rem;font-weight:800;letter-spacing:-.03em;animation:countUp .6s ease-out both}
.stat-value.green{color:var(--green)} .stat-value.red{color:var(--red)} .stat-value.blue{color:var(--blue)} .stat-value.accent{color:var(--accent)}
.stat-sub{font-size:.72rem;color:var(--text-tertiary);margin-top:4px}

.btn{display:inline-flex;align-items:center;gap:8px;padding:10px 20px;border-radius:var(--radius-md);font-family:var(--font);font-weight:600;font-size:.85rem;cursor:pointer;border:none;transition:all .15s ease;letter-spacing:-.01em;position:relative;overflow:hidden}
.btn-primary{background:var(--accent);color:white;box-shadow:0 2px 8px rgba(232,93,44,.25)} .btn-primary:hover{background:var(--accent-hover);box-shadow:0 4px 16px rgba(232,93,44,.35);transform:translateY(-1px)} .btn-primary:active{transform:translateY(0)}
.btn-secondary{background:var(--bg-elevated);color:var(--text-primary);border:1px solid var(--border)} .btn-secondary:hover{background:var(--border)}
.btn-ghost{background:transparent;color:var(--text-secondary)} .btn-ghost:hover{background:var(--bg-elevated);color:var(--text-primary)}
.btn-success{background:var(--green);color:white;box-shadow:0 2px 8px rgba(45,159,111,.25)} .btn-success:hover{filter:brightness(.92);transform:translateY(-1px)}
.btn-sm{padding:6px 14px;font-size:.78rem} .btn-lg{padding:14px 28px;font-size:.95rem;border-radius:var(--radius-lg)}
.btn[disabled]{opacity:.4;pointer-events:none}

.fab{position:fixed;bottom:32px;right:32px;width:60px;height:60px;border-radius:50%;background:var(--accent);color:white;border:none;cursor:pointer;font-size:28px;display:flex;align-items:center;justify-content:center;box-shadow:0 6px 24px rgba(232,93,44,.4);transition:all .2s ease;z-index:90}
.fab:hover{transform:scale(1.08)} .fab:active{transform:scale(.95)}

.tx-list{display:flex;flex-direction:column}
.tx-item{display:flex;align-items:center;gap:16px;padding:16px 24px;border-bottom:1px solid var(--border-light);cursor:pointer;transition:background .1s ease}
.tx-item:hover{background:var(--bg-elevated)} .tx-item:last-child{border-bottom:none}
.tx-icon{width:42px;height:42px;border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center;font-size:1.2rem;flex-shrink:0}
.tx-icon.income{background:var(--green-light)} .tx-icon.expense{background:var(--red-light)}
.tx-info{flex:1;min-width:0} .tx-desc{font-weight:600;font-size:.88rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.tx-meta{display:flex;gap:12px;margin-top:3px;font-size:.73rem;color:var(--text-tertiary)}
.tx-amount{font-weight:700;font-size:.95rem;white-space:nowrap} .tx-amount.income{color:var(--green)} .tx-amount.expense{color:var(--text-primary)}
.tx-badges{display:flex;gap:6px;margin-left:8px;flex-wrap:wrap}
.tx-badge{padding:3px 8px;border-radius:var(--radius-full);font-size:.65rem;font-weight:600}
.tx-badge.invoice{background:var(--green-light);color:var(--green)} .tx-badge.no-invoice{background:var(--yellow-light);color:var(--yellow)}
.tx-badge.cash{background:var(--bg-elevated);color:var(--text-secondary)} .tx-badge.bank{background:var(--blue-light);color:var(--blue)}
.tx-badge.unreconciled{background:var(--red-light);color:var(--red)} .tx-badge.vat-tag{background:var(--accent-light);color:var(--accent)}

.filter-bar{display:flex;gap:10px;padding:16px 24px;border-bottom:1px solid var(--border-light);flex-wrap:wrap;align-items:center}
.filter-chip{padding:6px 14px;border-radius:var(--radius-full);font-size:.78rem;font-weight:500;cursor:pointer;border:1px solid var(--border);background:var(--bg-card);color:var(--text-secondary);transition:all .15s ease}
.filter-chip:hover{border-color:var(--accent);color:var(--text-primary)} .filter-chip.active{background:var(--accent);color:white;border-color:var(--accent)}
.filter-search{flex:1;min-width:180px;padding:8px 14px;border:1px solid var(--border);border-radius:var(--radius-md);font-family:var(--font);font-size:.85rem;background:var(--bg-card);outline:none;transition:border-color .15s}
.filter-search:focus{border-color:var(--accent);box-shadow:0 0 0 3px var(--accent-glow)}

.modal-overlay{position:fixed;inset:0;background:rgba(26,24,20,.5);backdrop-filter:blur(4px);z-index:200;display:flex;align-items:center;justify-content:center;animation:fadeIn .2s ease-out}
.modal{background:var(--bg-card);border-radius:var(--radius-xl);width:min(560px,92vw);max-height:90vh;overflow-y:auto;box-shadow:var(--shadow-xl);animation:fadeUp .3s ease-out}
.modal-header{padding:24px 28px 16px;display:flex;align-items:center;justify-content:space-between}
.modal-title{font-size:1.15rem;font-weight:800;letter-spacing:-.02em}
.modal-close{width:32px;height:32px;border-radius:var(--radius-sm);border:none;background:var(--bg-elevated);cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center;color:var(--text-secondary);transition:all .15s}
.modal-close:hover{background:var(--border);color:var(--text-primary)}
.modal-body{padding:0 28px 28px}

.field{margin-bottom:18px} .field-label{display:block;font-size:.78rem;font-weight:600;color:var(--text-secondary);margin-bottom:6px;letter-spacing:.02em}
.field-input{width:100%;padding:10px 14px;border:1px solid var(--border);border-radius:var(--radius-md);font-family:var(--font);font-size:.9rem;background:var(--bg-card);outline:none;transition:all .15s}
.field-input:focus{border-color:var(--accent);box-shadow:0 0 0 3px var(--accent-glow)}
.field-input-money{font-weight:700;font-size:1.1rem;letter-spacing:-.02em}
.field-row{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.field-toggle-row{display:flex;align-items:center;justify-content:space-between;padding:12px 0}
.field-hint{font-size:.72rem;color:var(--text-tertiary);margin-top:4px} .field-error{font-size:.72rem;color:var(--red);margin-top:4px}
.toggle{width:44px;height:24px;border-radius:12px;background:var(--border);border:none;cursor:pointer;position:relative;transition:background .2s}
.toggle.on{background:var(--accent)} .toggle::after{content:'';position:absolute;top:3px;left:3px;width:18px;height:18px;border-radius:50%;background:white;box-shadow:var(--shadow-sm);transition:transform .2s} .toggle.on::after{transform:translateX(20px)}

.type-picker{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:18px}
.type-option{padding:12px;border:2px solid var(--border);border-radius:var(--radius-md);text-align:center;cursor:pointer;transition:all .15s;font-weight:600;font-size:.85rem;background:var(--bg-card)}
.type-option:hover{border-color:var(--text-tertiary)}
.type-option.income.active{border-color:var(--green);background:var(--green-light);color:var(--green)}
.type-option.expense.active{border-color:var(--accent);background:var(--accent-light);color:var(--accent)}

.cat-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
.cat-item{padding:10px 6px;border:1px solid var(--border);border-radius:var(--radius-md);text-align:center;cursor:pointer;transition:all .12s;font-size:.72rem;font-weight:500;background:var(--bg-card)}
.cat-item:hover{border-color:var(--accent);background:var(--accent-light)} .cat-item.active{border-color:var(--accent);background:var(--accent);color:white}
.cat-item.suggested{border-color:var(--yellow);background:var(--yellow-light)} .cat-item-icon{font-size:1.3rem;margin-bottom:4px}

.tax-row{display:flex;justify-content:space-between;padding:8px 0;font-size:.85rem} .tax-row-label{color:var(--text-secondary)} .tax-row-value{font-weight:600}
.tax-total-row{display:flex;justify-content:space-between;padding:14px 0 4px;border-top:2px solid var(--text-primary);margin-top:8px}
.tax-total-label{font-weight:700;font-size:.95rem} .tax-total-value{font-weight:800;font-size:1.1rem;color:var(--accent)}

.risk-flag{display:flex;gap:14px;padding:16px 20px;border-radius:var(--radius-md);margin-bottom:12px;animation:fadeUp .4s ease-out both}
.risk-flag.warning{background:var(--yellow-light);border:1px solid rgba(229,161,14,.2)} .risk-flag.error{background:var(--red-light);border:1px solid rgba(217,64,64,.2)}
.risk-flag-icon{font-size:1.3rem;flex-shrink:0;margin-top:1px} .risk-flag-title{font-weight:700;font-size:.88rem;margin-bottom:3px} .risk-flag-detail{font-size:.8rem;color:var(--text-secondary);line-height:1.5}

.onboarding-shell{min-height:100vh;display:flex;align-items:center;justify-content:center;background:var(--bg-sidebar);padding:20px}
.onboarding-card{background:var(--bg-card);border-radius:var(--radius-xl);width:min(580px,100%);box-shadow:var(--shadow-xl);overflow:hidden}
.onboarding-header{padding:36px 36px 20px;text-align:center}
.onboarding-step-indicator{display:flex;gap:8px;justify-content:center;margin-bottom:24px}
.onboarding-dot{width:28px;height:4px;border-radius:2px;background:var(--border);transition:all .3s ease} .onboarding-dot.active{background:var(--accent);width:48px} .onboarding-dot.done{background:var(--green)}
.onboarding-title{font-size:1.35rem;font-weight:800;letter-spacing:-.03em;margin-bottom:6px}
.onboarding-subtitle{color:var(--text-secondary);font-size:.85rem}
.onboarding-body{padding:12px 36px 28px} .onboarding-footer{padding:0 36px 28px;display:flex;justify-content:space-between}

.period-selector{display:flex;gap:8px;align-items:center}
.period-btn{padding:6px 16px;border-radius:var(--radius-full);border:1px solid var(--border);background:var(--bg-card);font-family:var(--font);font-size:.78rem;font-weight:500;cursor:pointer;transition:all .15s;color:var(--text-secondary)}
.period-btn:hover{border-color:var(--accent);color:var(--text-primary)}
.period-btn.active{background:var(--accent);color:white;border-color:var(--accent)}

.mini-chart{height:160px;display:flex;align-items:flex-end;gap:8px;padding:16px 0}
.chart-bar-group{flex:1;display:flex;flex-direction:column;align-items:center;gap:6px}
.chart-bars{display:flex;gap:3px;align-items:flex-end;height:120px;width:100%;justify-content:center}
.chart-bar{width:16px;border-radius:4px 4px 0 0;transition:height .6s cubic-bezier(.34,1.56,.64,1);min-height:4px}
.chart-bar.income{background:var(--green)} .chart-bar.expense{background:var(--accent);opacity:.7}
.chart-label{font-size:.65rem;color:var(--text-tertiary);font-weight:500}

.empty-state{text-align:center;padding:48px 24px;color:var(--text-tertiary)} .empty-icon{font-size:3rem;margin-bottom:16px;opacity:.4} .empty-text{font-size:.9rem;margin-bottom:16px}

.toast-container{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);z-index:500;display:flex;flex-direction:column;gap:8px;align-items:center}
.toast{padding:14px 24px;border-radius:var(--radius-lg);background:var(--bg-sidebar);color:var(--text-inverse);font-size:.88rem;font-weight:500;display:flex;align-items:center;gap:10px;box-shadow:0 8px 32px rgba(0,0,0,.25);animation:toastIn .35s ease-out both;min-width:300px}
.toast.success{border-left:4px solid var(--green)} .toast.warning{border-left:4px solid var(--yellow)} .toast.error{border-left:4px solid var(--red)}
.toast.exiting{animation:toastOut .25s ease-in both}
.toast-body{flex:1} .toast-title{font-weight:700;font-size:.85rem} .toast-detail{font-size:.75rem;opacity:.8;margin-top:2px}
.toast-action{padding:4px 12px;border-radius:var(--radius-sm);background:rgba(255,255,255,.12);border:none;color:white;font-size:.75rem;font-weight:600;cursor:pointer;font-family:var(--font);transition:background .15s} .toast-action:hover{background:rgba(255,255,255,.2)}

.balance-row{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px}
.balance-card{padding:18px 22px;border-radius:var(--radius-lg);border:1px solid var(--border);background:var(--bg-card);display:flex;align-items:center;gap:14px}
.balance-icon{width:44px;height:44px;border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center;font-size:1.3rem;flex-shrink:0}
.alert-strip{display:flex;gap:12px;padding:14px 20px;border-radius:var(--radius-md);margin-bottom:12px;align-items:center;font-size:.85rem;cursor:pointer;transition:all .15s}
.alert-strip:hover{transform:translateX(2px)}
.alert-strip.deadline{background:linear-gradient(135deg,var(--accent-light),#FFF5EE);border:1px solid rgba(232,93,44,.15)}
.alert-strip.exempt{background:var(--green-light);border:1px solid rgba(45,159,111,.15)}
.alert-strip.risk{background:var(--yellow-light);border:1px solid rgba(229,161,14,.15)}
.alert-strip.info{background:var(--blue-light);border:1px solid rgba(59,125,216,.15)}

.snapshot-banner{display:flex;align-items:center;gap:12px;padding:14px 20px;background:var(--green-light);border:1px solid rgba(45,159,111,.2);border-radius:var(--radius-md);margin-bottom:20px;font-size:.85rem;color:var(--green);font-weight:500}
.risk-score-ring{width:100px;height:100px;position:relative;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.risk-score-value{font-size:1.5rem;font-weight:800;position:absolute}

.tax-gate-banner{padding:20px 24px;border-radius:var(--radius-lg);margin-bottom:24px;display:flex;gap:16px;align-items:center}
.tax-gate-banner.exempt{background:linear-gradient(135deg,#EDFAF3,#E0F7EC);border:2px solid rgba(45,159,111,.25)}
.tax-gate-banner.taxable{background:linear-gradient(135deg,var(--accent-light),#FFE8DE);border:2px solid rgba(232,93,44,.2)}

.vat-group-row{display:flex;justify-content:space-between;padding:10px 0;font-size:.85rem;align-items:center;border-bottom:1px solid var(--border-light)}
.vat-group-row:last-child{border-bottom:none}
.vat-group-badge{padding:3px 10px;border-radius:var(--radius-full);font-size:.68rem;font-weight:700;background:var(--accent-light);color:var(--accent)}

.pit-method-card{padding:16px 20px;border-radius:var(--radius-md);border:2px solid var(--border);cursor:pointer;transition:all .15s;margin-bottom:10px}
.pit-method-card:hover{border-color:var(--text-tertiary)}
.pit-method-card.active{border-color:var(--blue);background:var(--blue-light)}

.ledger-item{display:flex;align-items:center;gap:16px;padding:18px 24px;border:1px solid var(--border-light);border-radius:var(--radius-md);margin-bottom:10px;background:var(--bg-card);transition:all .15s ease}
.ledger-item:hover{border-color:var(--accent);box-shadow:var(--shadow-sm);transform:translateX(2px)}
.ledger-info{flex:1;min-width:0} .ledger-title{font-weight:700;font-size:.9rem;margin-bottom:2px} .ledger-desc{font-size:.78rem;color:var(--text-tertiary);line-height:1.4}
.ledger-tag{padding:3px 10px;border-radius:var(--radius-full);font-size:.68rem;font-weight:600;margin-left:8px;white-space:nowrap}
.ledger-export-btn{display:inline-flex;align-items:center;gap:6px;padding:8px 18px;border-radius:var(--radius-md);background:#2D6A4F;color:white;border:none;font-family:var(--font);font-size:.8rem;font-weight:600;cursor:pointer;transition:all .15s;flex-shrink:0;white-space:nowrap}
.ledger-export-btn:hover{background:#245a42;box-shadow:0 2px 8px rgba(45,106,79,.3);transform:translateY(-1px)}
.ledger-export-btn svg{width:14px;height:14px}
.ledger-disabled{opacity:.45;pointer-events:none}

.mobile-nav{display:none;position:fixed;bottom:0;left:0;right:0;background:var(--bg-card);border-top:1px solid var(--border);z-index:100;padding:4px 0 env(safe-area-inset-bottom,4px);box-shadow:0 -2px 12px rgba(0,0,0,.06)}
.mobile-nav-items{display:flex;justify-content:space-around}
.mobile-nav-item{display:flex;flex-direction:column;align-items:center;gap:1px;padding:6px 4px;border:none;background:none;font-family:var(--font);font-size:.58rem;color:var(--text-tertiary);cursor:pointer;transition:color .15s;position:relative;min-width:0;max-width:72px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;letter-spacing:-.01em}
.mobile-nav-item.active{color:var(--accent);font-weight:600} .mobile-nav-item svg{width:20px;height:20px;flex-shrink:0}
.mobile-nav-item .nav-badge{position:absolute;top:0;right:0;background:var(--accent);color:white;font-size:.5rem;font-weight:700;padding:1px 4px;border-radius:var(--radius-full);min-width:14px;text-align:center}

.mobile-more-overlay{position:fixed;inset:0;background:rgba(26,24,20,.45);backdrop-filter:blur(3px);z-index:150;animation:fadeIn .2s ease-out}
.mobile-more-drawer{position:fixed;bottom:0;left:0;right:0;background:var(--bg-card);border-radius:var(--radius-xl) var(--radius-xl) 0 0;z-index:151;padding:0 0 env(safe-area-inset-bottom,12px);max-height:75vh;overflow-y:auto;animation:mobileDrawerUp .25s ease-out;box-shadow:0 -8px 40px rgba(0,0,0,.15)}
@keyframes mobileDrawerUp{from{transform:translateY(100%)}to{transform:translateY(0)}}
.mobile-more-handle{width:36px;height:4px;background:var(--border);border-radius:2px;margin:10px auto 6px}
.mobile-more-title{font-size:.82rem;font-weight:700;color:var(--text-secondary);padding:4px 20px 10px;letter-spacing:-.01em}
.mobile-more-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:4px;padding:0 12px 12px}
.mobile-more-item{display:flex;flex-direction:column;align-items:center;gap:4px;padding:12px 4px;border:none;background:none;font-family:var(--font);font-size:.68rem;color:var(--text-secondary);cursor:pointer;border-radius:var(--radius-md);transition:all .12s;position:relative}
.mobile-more-item:hover,.mobile-more-item:active{background:var(--bg-elevated);color:var(--text-primary)}
.mobile-more-item.active{color:var(--accent);background:var(--accent-light)}
.mobile-more-item svg{width:22px;height:22px}
.mobile-more-item .nav-badge{position:absolute;top:4px;right:8px;background:var(--accent);color:white;font-size:.5rem;font-weight:700;padding:1px 4px;border-radius:var(--radius-full)}
.mobile-more-divider{height:1px;background:var(--border-light);margin:4px 16px 8px}
.mobile-more-item.danger{color:var(--red)}

.duplicate-warning{background:var(--yellow-light);border:1px solid rgba(229,161,14,.3);border-radius:var(--radius-md);padding:14px 18px;margin-bottom:16px;display:flex;gap:12px;align-items:flex-start;animation:slideDown .3s ease-out}

::-webkit-scrollbar{width:6px} ::-webkit-scrollbar-track{background:transparent} ::-webkit-scrollbar-thumb{background:var(--border);border-radius:3px}
@media(max-width:900px){.sidebar{display:none}.main-content{margin-left:0;padding-bottom:72px;overflow-x:hidden;max-width:100vw}.mobile-nav{display:block}.stat-grid{grid-template-columns:repeat(2,1fr);gap:10px}.stat-card{min-width:0;overflow:hidden}.page-header,.page-body{padding-left:14px;padding-right:14px;overflow-x:hidden;max-width:100%}.page-title{font-size:1.25rem}.page-subtitle{font-size:.78rem}.fab{bottom:80px;right:16px;width:50px;height:50px;font-size:22px}.balance-row{grid-template-columns:1fr}.card{min-width:0;overflow:hidden;max-width:100%}.card-header{padding:14px 16px;flex-direction:column;gap:8px}.card-body{padding:16px;overflow-x:auto}.card-title{font-size:.88rem}.tx-item{padding:12px 14px;gap:10px}.tx-icon{width:36px;height:36px;font-size:1rem}.tx-amount{font-size:.85rem}.tx-badges{display:none}.filter-bar{padding:10px 14px;gap:6px}.modal{width:min(560px,96vw)}.modal-body{padding:0 18px 20px}.modal-header{padding:18px 18px 12px}.risk-top-grid{grid-template-columns:1fr!important}.risk-stats-grid{grid-template-columns:1fr 1fr!important}.risk-flag{flex-wrap:wrap;gap:8px}.inv-grid{grid-template-columns:1fr!important}.inv-create-grid{grid-template-columns:1fr!important}.inv-item-header{display:none!important}.inv-item-row{display:flex!important;flex-direction:column!important;gap:8px!important}.inv-item-row input{width:100%!important}.inv-stat-grid{grid-template-columns:repeat(2,1fr)!important;gap:10px!important}}
@media(max-width:600px){html{font-size:14px}.stat-grid{grid-template-columns:1fr 1fr;gap:6px}.stat-card{padding:10px 12px}.stat-value{font-size:.95rem;word-break:break-all;overflow:hidden;text-overflow:ellipsis}.stat-label{font-size:.65rem}.stat-sub{font-size:.6rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.page-title{font-size:1.15rem}.page-header{gap:8px;flex-wrap:wrap}.balance-card{padding:12px 14px;gap:10px}.balance-icon{width:36px;height:36px;font-size:1.1rem}.alert-strip{font-size:.78rem;padding:10px 14px}.filter-search{min-width:120px}.field-row{grid-template-columns:1fr}.cat-grid{grid-template-columns:repeat(3,1fr)}.card-header{flex-direction:column;align-items:flex-start;gap:6px}}
`;

// ─── SVG Icons ───────────────────────────────────────────────────────────────
const Icons = {
    Home: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>,
    List: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>,
    Tax: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="18" rx="2" /><line x1="8" y1="7" x2="16" y2="7" /><line x1="8" y1="11" x2="16" y2="11" /><line x1="8" y1="15" x2="12" y2="15" /></svg>,
    Shield: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
    Bank: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>,
    Plus: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>,
    X: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>,
    Lock: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>,
    Download: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>,
    Camera: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></svg>,
    ArrowRight: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>,
    Clock: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
    AlertTriangle: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>,
    Check: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>,
    Settings: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" /></svg>,
    Edit: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>,
    Package: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21" /><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>,
    Unlock: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 019.9-1" /></svg>,
    Print: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9" /><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" /><rect x="6" y="14" width="12" height="8" /></svg>,
    Sliders: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" /><line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" /><line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" /><line x1="1" y1="14" x2="7" y2="14" /><line x1="9" y1="8" x2="15" y2="8" /><line x1="17" y1="16" x2="23" y2="16" /></svg>,
    Trash: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" /></svg>,
    Image: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>,
    RefreshCw: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" /><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" /></svg>,
    Upload: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>,
    FileText: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>,
    Wallet: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12V8H6a2 2 0 01-2-2c0-1.1.9-2 2-2h12v4" /><path d="M4 6v12a2 2 0 002 2h14v-4" /><path d="M18 12a2 2 0 000 4h4v-4h-4z" /></svg>,
    Calendar: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
    HelpCircle: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>,
};

// ═══════════════════════════════════════════════════════════════════════════════
// TOAST
// ═══════════════════════════════════════════════════════════════════════════════
function useToast() { const [t, sT] = useState([]); const add = useCallback((toast) => { const id = Date.now() + Math.random(); sT(p => [...p, { ...toast, id }]); setTimeout(() => { sT(p => p.map(x => x.id === id ? { ...x, exiting: true } : x)); setTimeout(() => sT(p => p.filter(x => x.id !== id)), 300) }, toast.duration || 4000) }, []); return { toasts: t, addToast: add }; }
function ToastContainer({ toasts }) { if (!toasts.length) return null; return (<div className="toast-container">{toasts.map(t => (<div key={t.id} className={`toast ${t.type} ${t.exiting ? "exiting" : ""}`}><span style={{ fontSize: "1.1rem" }}>{t.type === "success" ? "✓" : t.type === "warning" ? "⚠" : "!"}</span><div className="toast-body"><div className="toast-title">{t.title}</div>{t.detail && <div className="toast-detail">{t.detail}</div>}</div>{t.action && <button className="toast-action" onClick={t.action.onClick}>{t.action.label}</button>}</div>))}</div>); }

// ═══════════════════════════════════════════════════════════════════════════════
// SIDEBAR + MOBILE NAV
// ═══════════════════════════════════════════════════════════════════════════════
function Sidebar({ activePage, onNavigate, business, riskCount, unreconciledCount }) {
    const nav = [{ id: "dashboard", label: "Tổng quan", icon: Icons.Home }, { id: "transactions", label: "Thu chi", icon: Icons.List }, { id: "cashbook", label: "Sổ tiền", icon: Icons.Wallet }, { id: "invoice", label: "Hóa đơn", icon: Icons.FileText }, { id: "inventory", label: "Tồn kho", icon: Icons.Package }, { id: "reconcile", label: "Đối soát NH", icon: Icons.Bank, badge: unreconciledCount || null }, { id: "tax", label: "Thuế & Báo cáo", icon: Icons.Tax }, { id: "taxcalendar", label: "Lịch thuế", icon: Icons.Calendar }, { id: "risk", label: "Kiểm tra rủi ro", icon: Icons.Shield, badge: riskCount || null }];
    const vatG = VAT_GROUPS.find(g => g.id === business.default_vat_group);
    const tierLabel = business.revenue_tier === "under_500m" ? "≤500M" : business.revenue_tier === "500m_3b" ? "500M–3T" : "≥3T";
    return (<nav className="sidebar">
        <div className="sidebar-brand"><img src={HKDTAX_LOGO} alt="HKD Tax" style={{ width: 40, height: 40, borderRadius: "var(--radius-md)" }} /><div><div className="sidebar-brand-text">HKD Tax</div><div className="sidebar-brand-sub">Luật 2026</div></div></div>
        <div className="sidebar-section"><div className="sidebar-section-label">Quản lý</div>{nav.map(item => (<button key={item.id} className={`sidebar-item ${activePage === item.id ? "active" : ""}`} onClick={() => onNavigate(item.id)}><item.icon />{item.label}{item.badge && <span className="badge">{item.badge}</span>}</button>))}</div>
        <div className="sidebar-section"><div className="sidebar-section-label">Hệ thống</div><button className={`sidebar-item ${activePage === "setup" ? "active" : ""}`} onClick={() => onNavigate("setup")}><Icons.Sliders />Cấu hình</button><button className={`sidebar-item ${activePage === "settings" ? "active" : ""}`} onClick={() => onNavigate("settings")}><Icons.Settings />Cài đặt thuế</button><button className={`sidebar-item ${activePage === "support" ? "active" : ""}`} onClick={() => onNavigate("support")}><Icons.HelpCircle />Hỗ trợ</button><button className="sidebar-item" onClick={async () => { const { signOut } = await import('./lib/auth'); await signOut(); }} style={{ color: 'var(--red)', marginTop: 8, opacity: .8 }}><Icons.Shield />Đăng xuất</button></div>
        {/* Profile card */}
        <div className="sidebar-business" onClick={() => onNavigate("settings")} style={{ cursor: "pointer", transition: "all .15s", borderRadius: "var(--radius-md)", padding: "16px 12px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div className="sidebar-business-name">{business.name || "Chưa cấu hình"}</div>
                <span style={{ color: "var(--text-sidebar)", opacity: .6 }}><Icons.Edit /></span>
            </div>
            {business.tax_id && <div className="sidebar-business-id">MST: {business.tax_id}</div>}
            <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
                <span style={{ padding: "2px 8px", borderRadius: "var(--radius-full)", fontSize: ".6rem", fontWeight: 600, background: "rgba(232,93,44,.15)", color: "var(--accent)" }}>{tierLabel}</span>
                {vatG && <span style={{ padding: "2px 8px", borderRadius: "var(--radius-full)", fontSize: ".6rem", fontWeight: 600, background: "rgba(59,125,216,.15)", color: "var(--blue)" }}>VAT {vatG.rateLabel}</span>}
                {business.pit_method && <span style={{ padding: "2px 8px", borderRadius: "var(--radius-full)", fontSize: ".6rem", fontWeight: 600, background: "rgba(45,159,111,.15)", color: "var(--green)" }}>PIT {business.pit_method === "PROFIT" ? "LN" : "%DT"}</span>}
            </div>
        </div>
    </nav>);
}
function MobileNav({ activePage, onNavigate, riskCount, unreconciledCount, business }) {
    const [showMore, setShowMore] = useState(false);
    const primaryItems = [
        { id: "dashboard", label: "Tổng quan", icon: Icons.Home },
        { id: "transactions", label: "Thu chi", icon: Icons.List },
        { id: "invoice", label: "Hóa đơn", icon: Icons.FileText },
        { id: "tax", label: "Thuế", icon: Icons.Tax },
    ];
    const moreItems = [
        { id: "cashbook", label: "Sổ tiền", icon: Icons.Wallet },
        { id: "inventory", label: "Tồn kho", icon: Icons.Package },
        { id: "reconcile", label: "Đối soát NH", icon: Icons.Bank, badge: unreconciledCount || null },
        { id: "taxcalendar", label: "Lịch thuế", icon: Icons.Calendar },
        { id: "risk", label: "Rủi ro", icon: Icons.Shield, badge: riskCount || null },
        { id: "setup", label: "Cấu hình", icon: Icons.Sliders },
        { id: "settings", label: "Cài đặt thuế", icon: Icons.Settings },
        { id: "support", label: "Hỗ trợ", icon: Icons.HelpCircle },
    ];
    const isMoreActive = moreItems.some(i => i.id === activePage);
    const handleNav = (id) => { onNavigate(id); setShowMore(false); };
    return (<>
        <div className="mobile-nav">
            <div className="mobile-nav-items">
                {primaryItems.map(i => (
                    <button key={i.id} className={`mobile-nav-item ${activePage === i.id ? "active" : ""}`} onClick={() => handleNav(i.id)}>
                        <i.icon />{i.label}
                    </button>
                ))}
                <button className={`mobile-nav-item ${isMoreActive || showMore ? "active" : ""}`} onClick={() => setShowMore(v => !v)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}><circle cx="12" cy="5" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="19" r="1.5" /></svg>
                    Thêm
                </button>
            </div>
        </div>
        {showMore && (<>
            <div className="mobile-more-overlay" onClick={() => setShowMore(false)} />
            <div className="mobile-more-drawer">
                <div className="mobile-more-handle" />
                <div className="mobile-more-title">Tất cả chức năng</div>
                <div className="mobile-more-grid">
                    {moreItems.map(i => (
                        <button key={i.id} className={`mobile-more-item ${activePage === i.id ? "active" : ""}`} onClick={() => handleNav(i.id)}>
                            <i.icon />{i.badge > 0 && <span className="nav-badge">{i.badge}</span>}{i.label}
                        </button>
                    ))}
                </div>
                <div className="mobile-more-divider" />
                <div className="mobile-more-grid">
                    <button className="mobile-more-item danger" onClick={async () => { const { signOut } = await import('./lib/auth'); await signOut(); }}>
                        <Icons.Shield />Đăng xuất
                    </button>
                </div>
            </div>
        </>)}
    </>);
}

// ═══════════════════════════════════════════════════════════════════════════════
// MINI CHART
// ═══════════════════════════════════════════════════════════════════════════════
function MiniChart({ transactions }) { const months = ["T1", "T2", "T3"]; const data = months.map((label, i) => { const m = String(i + 1).padStart(2, "0"); const inc = transactions.filter(t => t.type === "income" && t.tx_date.includes(`-${m}-`)).reduce((s, t) => s + t.amount, 0); const exp = transactions.filter(t => t.type === "expense" && t.tx_date.includes(`-${m}-`)).reduce((s, t) => s + t.amount, 0); return { label, income: inc, expense: exp } }); const mx = Math.max(...data.flatMap(d => [d.income, d.expense]), 1); return (<div className="mini-chart">{data.map((d, i) => (<div key={i} className="chart-bar-group"><div className="chart-bars"><div className="chart-bar income" style={{ height: `${(d.income / mx) * 100}%` }} /><div className="chart-bar expense" style={{ height: `${(d.expense / mx) * 100}%` }} /></div><span className="chart-label">{d.label}</span></div>))}</div>); }

// ═══════════════════════════════════════════════════════════════════════════════
// DASHBOARD — with 2026 Tax Gate awareness
// ═══════════════════════════════════════════════════════════════════════════════
function Dashboard({ transactions, business, onAddTx, onNavigate }) {
    const tax = computeTax2026(transactions, business);
    const recentTx = [...transactions].sort((a, b) => b.tx_date.localeCompare(a.tx_date)).slice(0, 5);
    const riskFlags = getRiskFlags(transactions);
    const noInvExpense = transactions.filter(t => t.type === "expense" && !t.has_invoice && t.amount >= 200000).reduce((s, t) => s + t.amount, 0);
    const expTotal = tax.expense || 1; const noInvRatio = ((noInvExpense / expTotal) * 100).toFixed(1);
    const riskLabel = noInvRatio > 30 ? "Rủi ro cao" : noInvRatio > 15 ? "Trung bình" : "An toàn";
    const riskColor = noInvRatio > 30 ? "var(--red)" : noInvRatio > 15 ? "var(--yellow)" : "var(--green)";

    return (<>
        <div className="page-header"><div><h1 className="page-title">Tổng quan</h1><p className="page-subtitle">Q1/2026 — {business.name}</p></div><button className="btn btn-primary" onClick={onAddTx}><Icons.Plus /> Thêm thu/chi</button></div>
        <div className="page-body">
            {/* Balance */}
            <div className="balance-row fade-up">
                <div className="balance-card"><div className="balance-icon" style={{ background: "var(--green-light)" }}>💵</div><div><div style={{ fontSize: ".72rem", color: "var(--text-tertiary)", fontWeight: 500, textTransform: "uppercase", letterSpacing: ".04em" }}>Tiền mặt</div><div style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--green)" }}>{fmtVND(business.cash_balance)}</div></div></div>
                <div className="balance-card"><div className="balance-icon" style={{ background: "var(--blue-light)" }}>🏦</div><div><div style={{ fontSize: ".72rem", color: "var(--text-tertiary)", fontWeight: 500, textTransform: "uppercase", letterSpacing: ".04em" }}>Ngân hàng</div><div style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--blue)" }}>{fmtVND(business.bank_balance)}</div></div></div>
            </div>

            {/* Tax Gate Banner */}
            <div className="fade-up" style={{ animationDelay: ".05s", marginBottom: 20 }}>
                {tax.isUnderGate ? (
                    <div className="alert-strip exempt" onClick={() => onNavigate("tax")}>
                        <span style={{ fontSize: "1.2rem" }}>✅</span>
                        <div style={{ flex: 1 }}><span style={{ fontWeight: 700 }}>Doanh thu ước tính ≤ 500 triệu/năm</span><br /><span style={{ fontSize: ".78rem", color: "var(--green)" }}>Không chịu VAT, không nộp PIT — Chỉ cần Sổ S1a</span></div>
                        <span style={{ fontSize: ".78rem", fontWeight: 600, color: "var(--green)" }}>Xem chi tiết →</span>
                    </div>
                ) : (
                    <div className="alert-strip deadline" onClick={() => onNavigate("tax")}>
                        <Icons.Clock />
                        <div style={{ flex: 1 }}>
                            <span style={{ fontWeight: 700 }}>Thuế tạm tính Q1: </span>
                            VAT {fmtVND(tax.totalVat)} + PIT {fmtVND(tax.pit)}
                            <span style={{ fontSize: ".72rem", color: "var(--text-tertiary)", marginLeft: 8 }}>({tax.pitMethod === "PROFIT" ? "PIT theo lợi nhuận" : "PIT theo % doanh thu"})</span>
                        </div>
                        <span style={{ fontSize: ".78rem", fontWeight: 600, color: "var(--accent)" }}>Đến hạn 30/04 →</span>
                    </div>
                )}
                {/* Môn bài notice */}
                <div style={{ padding: "8px 14px", background: "var(--bg-elevated)", borderRadius: "var(--radius-sm)", fontSize: ".72rem", color: "var(--text-tertiary)", marginBottom: 12 }}>
                    📋 Từ 01/01/2026: Bỏ thuế khoán + Bỏ lệ phí môn bài (Luật 109/2025/QH15)
                </div>
            </div>

            {/* Stats */}
            <div className="stat-grid">
                <div className="stat-card green" style={{ animationDelay: ".05s" }}><div className="stat-label">Doanh thu</div><div className="stat-value green">{fmtVND(tax.revenue)}</div><div className="stat-sub">{transactions.filter(t => t.type === "income").length} giao dịch</div></div>
                <div className="stat-card accent" style={{ animationDelay: ".1s" }}><div className="stat-label">Chi phí</div><div className="stat-value accent">{fmtVND(tax.expense)}</div><div className="stat-sub">{transactions.filter(t => t.type === "expense").length} giao dịch</div></div>
                <div className="stat-card blue" style={{ animationDelay: ".15s" }}><div className="stat-label">Lợi nhuận</div><div className="stat-value blue">{fmtVND(tax.profit)}</div><div className="stat-sub">{((tax.profit / (tax.revenue || 1)) * 100).toFixed(1)}% margin</div></div>
                <div className="stat-card yellow" style={{ animationDelay: ".2s", cursor: "pointer" }} onClick={() => onNavigate("tax")}><div className="stat-label">Thuế phải nộp</div><div className="stat-value" style={{ color: tax.isUnderGate ? "var(--green)" : "var(--accent)" }}>{tax.isUnderGate ? "0đ" : fmtVND(tax.totalTax)}</div><div className="stat-sub">{tax.isUnderGate ? "Miễn thuế (≤500M)" : "VAT + PIT"}</div></div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div className="card card-glow fade-up" style={{ animationDelay: ".15s" }}><div className="card-header"><span className="card-title">Doanh thu & Chi phí</span><div style={{ display: "flex", gap: 12, fontSize: ".72rem" }}><span style={{ display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 10, height: 10, borderRadius: 3, background: "var(--green)", display: "inline-block" }} /> Thu</span><span style={{ display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 10, height: 10, borderRadius: 3, background: "var(--accent)", opacity: .7, display: "inline-block" }} /> Chi</span></div></div><div className="card-body"><MiniChart transactions={transactions} /></div></div>
                <div className="card card-glow fade-up" style={{ animationDelay: ".2s" }}><div className="card-header"><span className="card-title">Cảnh báo rủi ro</span><span style={{ fontSize: ".72rem", color: riskFlags.length > 0 ? "var(--yellow)" : "var(--green)", fontWeight: 600, cursor: "pointer" }} onClick={() => onNavigate("risk")}>{riskFlags.length > 0 ? `${riskFlags.length} cảnh báo →` : "Ổn định"}</span></div><div className="card-body" style={{ padding: "16px 20px" }}>{riskFlags.length === 0 ? (<div style={{ textAlign: "center", padding: 20, color: "var(--green)", fontSize: ".85rem" }}><div style={{ fontSize: "2rem", marginBottom: 8 }}>✓</div>Không có cảnh báo</div>) : riskFlags.slice(0, 3).map((f, i) => (<div key={i} className={`risk-flag ${f.severity}`} style={{ padding: "12px 14px", marginBottom: 8 }}><span className="risk-flag-icon">{f.severity === "error" ? "🔴" : "🟡"}</span><div><div className="risk-flag-title">{f.title}</div><div className="risk-flag-detail">{f.detail}</div></div></div>))}</div></div>
            </div>

            {/* Recent Tx */}
            <div className="card card-glow fade-up" style={{ marginTop: 20, animationDelay: ".25s" }}><div className="card-header"><span className="card-title">Giao dịch gần đây</span><span style={{ fontSize: ".78rem", color: "var(--accent)", fontWeight: 600, cursor: "pointer" }} onClick={() => onNavigate("transactions")}>Xem tất cả →</span></div><div className="tx-list">{recentTx.map(tx => (<div key={tx.id} className="tx-item"><div className={`tx-icon ${tx.type}`}>{tx.type === "income" ? "↗" : "↙"}</div><div className="tx-info"><div className="tx-desc">{tx.description}</div><div className="tx-meta"><span>{fmtShortDate(tx.tx_date)}</span><span>{tx.category_name}</span></div></div>{tx.vat_group && <span className="tx-badge vat-tag">{VAT_GROUPS.find(g => g.id === tx.vat_group)?.rateLabel}</span>}<div className={`tx-amount ${tx.type}`}>{tx.type === "income" ? "+" : "−"}{fmtVND(tx.amount)}</div></div>))}</div></div>
        </div>
    </>);
}

// ═══════════════════════════════════════════════════════════════════════════════
// TRANSACTION LIST
// ═══════════════════════════════════════════════════════════════════════════════
function TransactionList({ transactions, onAddTx, onUpdateTx, onDeleteTx, wallets, categories, addToast, riskFilter, onClearRiskFilter }) {
    const [typeFilter, setTypeFilter] = useState(riskFilter?.type || "all"); const [search, setSearch] = useState("");
    const [selectedTx, setSelectedTx] = useState(null);
    const filtered = useMemo(() => { let l = [...transactions]; if (riskFilter?.filterFn) l = l.filter(riskFilter.filterFn); else { if (typeFilter !== "all") l = l.filter(t => t.type === typeFilter) } if (search.trim()) { const q = search.toLowerCase(); l = l.filter(t => t.description.toLowerCase().includes(q) || (t.counterparty || "").toLowerCase().includes(q)) } return l.sort((a, b) => b.tx_date.localeCompare(a.tx_date)) }, [transactions, typeFilter, search, riskFilter]);
    const totalIncome = filtered.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0);
    const totalExpense = filtered.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0);
    return (<><div className="page-header"><div><h1 className="page-title">Thu chi</h1><p className="page-subtitle">{filtered.length} giao dịch{riskFilter ? ` · ${riskFilter.label}` : ""}</p></div><button className="btn btn-primary" onClick={onAddTx}><Icons.Plus /> Thêm thu/chi</button></div><div className="page-body">
        {riskFilter && (<div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 16px", background: "var(--yellow-light)", border: "1px solid var(--yellow)", borderRadius: "var(--radius-md)", marginBottom: 16, fontSize: ".85rem" }}>
            <span style={{ fontSize: "1.1rem" }}>🔍</span>
            <div style={{ flex: 1 }}><span style={{ fontWeight: 600, color: "var(--yellow)" }}>Bộ lọc rủi ro:</span> {riskFilter.label} — {filtered.length} giao dịch</div>
            <button className="btn btn-sm btn-secondary" onClick={onClearRiskFilter} style={{ flexShrink: 0 }}>✕ Bỏ lọc</button>
        </div>)}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 20 }}><div className="stat-card green" style={{ padding: "14px 18px" }}><div className="stat-label" style={{ fontSize: ".68rem" }}>Tổng thu</div><div className="stat-value green" style={{ fontSize: "1.15rem" }}>+{fmtVND(totalIncome)}</div></div><div className="stat-card accent" style={{ padding: "14px 18px" }}><div className="stat-label" style={{ fontSize: ".68rem" }}>Tổng chi</div><div className="stat-value accent" style={{ fontSize: "1.15rem" }}>−{fmtVND(totalExpense)}</div></div><div className="stat-card blue" style={{ padding: "14px 18px" }}><div className="stat-label" style={{ fontSize: ".68rem" }}>Chênh lệch</div><div className="stat-value blue" style={{ fontSize: "1.15rem" }}>{fmtVND(totalIncome - totalExpense)}</div></div></div>
        <div className="card card-glow"><div className="filter-bar">{["all", "income", "expense"].map(f => (<button key={f} className={`filter-chip ${typeFilter === f ? "active" : ""}`} onClick={() => setTypeFilter(f)}>{f === "all" ? "Tất cả" : f === "income" ? "↗ Thu" : "↙ Chi"}</button>))}<input className="filter-search" placeholder="Tìm kiếm..." value={search} onChange={e => setSearch(e.target.value)} /></div><div className="tx-list">{filtered.length === 0 ? (<div className="empty-state"><div className="empty-icon">📭</div><div className="empty-text">Không tìm thấy giao dịch</div></div>) : filtered.map((tx, i) => (<div key={tx.id} className="tx-item slide-right" style={{ animationDelay: `${i * .03}s`, cursor: "pointer" }} onClick={() => setSelectedTx(tx)}>
            <div className={`tx-icon ${tx.type}`}>{tx.type === "income" ? "↗" : "↙"}</div>
            <div className="tx-info"><div className="tx-desc" style={{ display: "flex", alignItems: "center", gap: 6 }}>{tx.description}{tx.invoice_img && (tx.invoice_thumb ? <img src={tx.invoice_thumb} alt="" style={{ width: 22, height: 22, objectFit: "cover", borderRadius: 3, border: "1px solid var(--border)", flexShrink: 0 }} /> : <span style={{ fontSize: ".65rem", color: "var(--accent)", background: "var(--accent-light)", padding: "1px 6px", borderRadius: 8 }}>📷</span>)}</div><div className="tx-meta"><span>{fmtDate(tx.tx_date)}</span><span>{tx.category_name}</span>{tx.counterparty && <span>• {tx.counterparty}</span>}</div></div>
            <div className="tx-badges"><span className={`tx-badge ${tx.has_invoice ? "invoice" : "no-invoice"}`}>{tx.has_invoice ? "✓ HĐ" : "Không HĐ"}</span>{tx.vat_group && <span className="tx-badge vat-tag">VAT {VAT_GROUPS.find(g => g.id === tx.vat_group)?.rateLabel}</span>}<span className={`tx-badge ${tx.payment_method === "cash" ? "cash" : "bank"}`}>{tx.payment_method === "cash" ? "Tiền mặt" : "CK"}</span></div>
            <div className={`tx-amount ${tx.type}`}>{tx.type === "income" ? "+" : "−"}{fmtVND(tx.amount)}</div>
        </div>))}</div></div></div>
        {selectedTx && <TransactionDetailModal tx={selectedTx} onClose={() => setSelectedTx(null)} onUpdateTx={(updated) => { onUpdateTx(updated); setSelectedTx(updated) }} onDeleteTx={(id) => { onDeleteTx(id); setSelectedTx(null) }} wallets={wallets} categories={categories} addToast={addToast} />}
    </>);
}

// ═══════════════════════════════════════════════════════════════════════════════
// TRANSACTION DETAIL MODAL — view detail + edit invoice image
// ═══════════════════════════════════════════════════════════════════════════════
function TransactionDetailModal({ tx, onClose, onUpdateTx, onDeleteTx, wallets, categories, addToast }) {
    const [compressing, setCompressing] = useState(false);
    const [viewImg, setViewImg] = useState(false);
    const [editing, setEditing] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [form, setForm] = useState(null);
    const fileRef = useRef(null);

    const walletName = wallets?.find(w => w.id === tx.payment_method);
    const vatG = tx.vat_group ? VAT_GROUPS.find(g => g.id === tx.vat_group) : null;

    // Start editing
    const startEdit = () => {
        setForm({
            type: tx.type, amount: String(tx.amount), description: tx.description, tx_date: tx.tx_date,
            category_id: tx.category_id, payment_method: tx.payment_method, has_invoice: tx.has_invoice,
            counterparty: tx.counterparty || "", vat_group: tx.vat_group || "service", invoice_img: tx.invoice_img || null, invoice_thumb: tx.invoice_thumb || null
        });
        setEditing(true);
    };

    // Save edit
    const saveEdit = () => {
        if (!form || !form.description.trim() || !form.amount) return;
        const amt = parseInt(String(form.amount).replace(/\D/g, ""));
        if (!amt || amt <= 0) { addToast({ type: "warning", title: "Số tiền không hợp lệ" }); return; }
        const cats = form.type === "income" ? categories.income : categories.expense;
        const cat = cats.find(c => c.id === form.category_id) || cats[0];
        onUpdateTx({
            ...tx, ...form, amount: amt, category_name: cat?.name || tx.category_name,
            vat_group: form.type === "income" ? form.vat_group : undefined
        });
        addToast({ type: "success", title: "Đã cập nhật giao dịch", detail: `${form.type === "income" ? "Thu" : "Chi"} ${fmtVND(amt)} — ${form.description}` });
        setEditing(false); setForm(null);
    };

    // Cancel edit
    const cancelEdit = () => { setEditing(false); setForm(null); };

    // Delete
    const handleDelete = () => {
        onDeleteTx(tx.id);
        addToast({ type: "success", title: "Đã xóa giao dịch", detail: `${tx.type === "income" ? "Thu" : "Chi"} ${fmtVND(tx.amount)} — ${tx.description}` });
    };

    // Image
    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0]; if (!file) return;
        setCompressing(true);
        try {
            const result = await compressImage(file);
            const imgPayload = { invoice_img: result.data, invoice_thumb: result.thumb, has_invoice: true };
            if (editing && form) { setForm(f => ({ ...f, ...imgPayload })); }
            else { onUpdateTx({ ...tx, ...imgPayload }); }
            addToast({
                type: "success", title: `Ảnh nén ${result.format} thành công`,
                detail: `${result.origWidth}×${result.origHeight} → ${result.width}×${result.height} · ${result.originalKB}KB → ${result.sizeKB}KB (−${result.ratio}%) · Q${result.quality}`
            });
        } catch (err) { addToast({ type: "warning", title: "Không thể nén ảnh", detail: err.message }); }
        setCompressing(false);
        if (fileRef.current) fileRef.current.value = "";
    };
    const removeImage = () => {
        if (editing && form) { setForm(f => ({ ...f, invoice_img: null, invoice_thumb: null, has_invoice: false })); }
        else { onUpdateTx({ ...tx, invoice_img: null, invoice_thumb: null }); }
        addToast({ type: "success", title: "Đã xóa ảnh hóa đơn" });
    };

    const handleAmt = e => { const raw = e.target.value.replace(/\D/g, ""); setForm(f => ({ ...f, amount: raw ? fmt(parseInt(raw)) : "" })); };
    const currentImg = editing && form ? form.invoice_img : tx.invoice_img;

    // ─── VIEW MODE ────
    const rows = [
        { label: "Loại", value: tx.type === "income" ? "↗ Thu nhập" : "↙ Chi phí", color: tx.type === "income" ? "var(--green)" : "var(--accent)" },
        { label: "Số tiền", value: (tx.type === "income" ? "+" : "−") + fmtVND(tx.amount), color: tx.type === "income" ? "var(--green)" : "var(--accent)", bold: true },
        { label: "Mô tả", value: tx.description },
        { label: "Ngày", value: fmtDate(tx.tx_date) },
        { label: "Danh mục", value: tx.category_name || "—" },
        { label: "Thanh toán", value: walletName ? (walletName.icon + " " + walletName.name) : (tx.payment_method === "cash" ? "💵 Tiền mặt" : "🏦 Chuyển khoản") },
        { label: "Hóa đơn", value: tx.has_invoice ? "✓ Có hóa đơn" : "✗ Không có", color: tx.has_invoice ? "var(--green)" : "var(--text-tertiary)" },
    ];
    if (tx.counterparty) rows.push({ label: "Đối tác", value: tx.counterparty });
    if (vatG) rows.push({ label: "Nhóm VAT", value: vatG.icon + " " + vatG.label + " (" + vatG.rateLabel + ")" });
    if (tx.reconciled !== undefined) rows.push({ label: "Đối soát", value: tx.reconciled ? "✓ Đã đối soát" : "Chưa đối soát", color: tx.reconciled ? "var(--green)" : "var(--yellow)" });

    return (<div className="modal-overlay" onClick={onClose}><div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 540 }}>
        <div className="modal-header">
            <h2 className="modal-title" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 32, height: 32, borderRadius: "var(--radius-sm)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", background: tx.type === "income" ? "var(--green-light)" : "var(--accent-light)", color: tx.type === "income" ? "var(--green)" : "var(--accent)" }}>{tx.type === "income" ? "↗" : "↙"}</span>
                {editing ? "Sửa giao dịch" : "Chi tiết giao dịch"}
            </h2>
            <button className="modal-close" onClick={onClose}><Icons.X /></button>
        </div>
        <div className="modal-body">

            {/* ─── DELETE CONFIRMATION ─── */}
            {confirmDelete && (
                <div style={{ padding: "16px 18px", background: "var(--red-light)", border: "1px solid var(--red)", borderRadius: "var(--radius-md)", marginBottom: 16 }}>
                    <div style={{ fontWeight: 700, fontSize: ".9rem", color: "var(--red)", marginBottom: 6 }}>Xác nhận xóa giao dịch?</div>
                    <div style={{ fontSize: ".82rem", color: "var(--text-secondary)", marginBottom: 12 }}>
                        {tx.type === "income" ? "Thu" : "Chi"} <strong>{fmtVND(tx.amount)}</strong> — {tx.description} ({fmtDate(tx.tx_date)})
                    </div>
                    <div style={{ fontSize: ".75rem", color: "var(--text-tertiary)", marginBottom: 12 }}>
                        Hành động này không thể hoàn tác. Giao dịch sẽ bị xóa khỏi sổ thu chi, ảnh hưởng đến báo cáo thuế và đối soát ngân hàng.
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                        <button className="btn btn-lg" style={{ flex: 1, justifyContent: "center", background: "var(--red)", color: "white", border: "none" }} onClick={handleDelete}><Icons.Trash /> Xóa vĩnh viễn</button>
                        <button className="btn btn-secondary btn-lg" style={{ flex: 1, justifyContent: "center" }} onClick={() => setConfirmDelete(false)}>Hủy</button>
                    </div>
                </div>
            )}

            {/* ─── EDIT MODE ─── */}
            {editing && form ? (
                <div>
                    {/* Type toggle */}
                    <div className="type-picker" style={{ marginBottom: 14 }}>
                        <div className={`type-option income ${form.type === "income" ? "active" : ""}`} onClick={() => setForm(f => ({ ...f, type: "income", category_id: "" }))}>↗ Thu</div>
                        <div className={`type-option expense ${form.type === "expense" ? "active" : ""}`} onClick={() => setForm(f => ({ ...f, type: "expense", category_id: "" }))}>↙ Chi</div>
                    </div>

                    {/* Amount */}
                    <div className="field"><label className="field-label">Số tiền</label>
                        <input className="field-input" inputMode="numeric" placeholder="0" value={form.amount ? fmt(parseInt(String(form.amount).replace(/\D/g, "")) || 0) : ""} onChange={handleAmt} style={{ fontSize: "1.1rem", fontWeight: 700, fontFamily: "var(--font-mono)" }} />
                    </div>

                    {/* Description */}
                    <div className="field"><label className="field-label">Mô tả</label>
                        <input className="field-input" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="VD: Mua nguyên liệu" />
                    </div>

                    {/* Date + Counterparty */}
                    <div className="field-row">
                        <div className="field"><label className="field-label">Ngày</label><input className="field-input" type="date" value={form.tx_date} onChange={e => setForm(f => ({ ...f, tx_date: e.target.value }))} /></div>
                        <div className="field"><label className="field-label">Đối tác</label><input className="field-input" value={form.counterparty} onChange={e => setForm(f => ({ ...f, counterparty: e.target.value }))} placeholder="VD: Chợ đầu mối" /></div>
                    </div>

                    {/* Category */}
                    <div className="field"><label className="field-label">Danh mục</label>
                        <div className="cat-grid">
                            {(form.type === "income" ? categories.income : categories.expense).map(cat => (
                                <div key={cat.id} className={`cat-item ${form.category_id === cat.id ? "active" : ""}`} onClick={() => setForm(f => ({ ...f, category_id: cat.id }))}>
                                    <div className="cat-item-icon">{cat.icon}</div>{cat.name}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Payment method */}
                    <div className="field"><label className="field-label">Thanh toán</label>
                        <div style={{ display: "grid", gridTemplateColumns: `repeat(${wallets.length},1fr)`, gap: 6 }}>
                            {wallets.map(w => (
                                <div key={w.id} onClick={() => setForm(f => ({ ...f, payment_method: w.id }))} style={{ padding: "8px", borderRadius: "var(--radius-sm)", border: `2px solid ${form.payment_method === w.id ? "var(--accent)" : "var(--border)"}`, background: form.payment_method === w.id ? "var(--accent-light)" : "var(--bg-card)", cursor: "pointer", textAlign: "center", fontSize: ".78rem", fontWeight: form.payment_method === w.id ? 700 : 500 }}>
                                    {w.icon} {w.name}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* VAT group (income) */}
                    {form.type === "income" && (
                        <div className="field"><label className="field-label">Nhóm VAT</label>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                                {VAT_GROUPS.map(g => (
                                    <div key={g.id} onClick={() => setForm(f => ({ ...f, vat_group: g.id }))} style={{ padding: "8px 10px", borderRadius: "var(--radius-sm)", border: `2px solid ${form.vat_group === g.id ? "var(--accent)" : "var(--border)"}`, background: form.vat_group === g.id ? "var(--accent-light)" : "var(--bg-card)", cursor: "pointer", fontSize: ".75rem" }}>
                                        <span>{g.icon} {g.label}</span>
                                        <span style={{ float: "right", fontFamily: "var(--font-mono)", fontWeight: 700, color: form.vat_group === g.id ? "var(--accent)" : "var(--text-tertiary)" }}>{g.rateLabel}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Invoice toggle */}
                    {form.type === "expense" && (
                        <div className="field-toggle-row"><div><div style={{ fontWeight: 600, fontSize: ".85rem" }}>Có hóa đơn?</div><div style={{ fontSize: ".72rem", color: "var(--text-tertiary)", marginTop: 2 }}>Chi phí có hóa đơn được khấu trừ thuế</div></div>
                            <button className={`toggle ${form.has_invoice ? "on" : ""}`} onClick={() => setForm(f => ({ ...f, has_invoice: !f.has_invoice }))} />
                        </div>
                    )}

                    {/* Save / Cancel */}
                    <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                        <button className="btn btn-primary btn-lg" style={{ flex: 1, justifyContent: "center" }} onClick={saveEdit}><Icons.Check /> Lưu thay đổi</button>
                        <button className="btn btn-secondary btn-lg" onClick={cancelEdit}>Hủy</button>
                    </div>
                </div>
            ) : (
                /* ─── VIEW MODE ─── */
                <div>
                    {/* Detail rows */}
                    <div style={{ borderRadius: "var(--radius-md)", border: "1px solid var(--border-light)", overflow: "hidden" }}>
                        {rows.map((r, i) => (
                            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", borderBottom: i < rows.length - 1 ? "1px solid var(--border-light)" : "none", background: i % 2 === 0 ? "var(--bg-card)" : "var(--bg-elevated)" }}>
                                <span style={{ fontSize: ".82rem", color: "var(--text-tertiary)", fontWeight: 500 }}>{r.label}</span>
                                <span style={{ fontSize: ".88rem", fontWeight: r.bold ? 700 : 600, color: r.color || "var(--text-primary)", textAlign: "right", maxWidth: "60%" }}>{r.value}</span>
                            </div>
                        ))}
                    </div>

                    {/* Invoice image section */}
                    <div style={{ marginTop: 16 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                            <label className="field-label" style={{ marginBottom: 0 }}>Ảnh hóa đơn</label>
                            <span style={{ fontSize: ".68rem", color: "var(--text-tertiary)" }}>WebP/JPEG · nén ≤40KB</span>
                        </div>

                        {currentImg ? (
                            <div style={{ borderRadius: "var(--radius-md)", border: "1px solid var(--border-light)", overflow: "hidden" }}>
                                <div onClick={() => setViewImg(!viewImg)} style={{ cursor: "pointer", background: "var(--bg-elevated)", display: "flex", alignItems: "center", justifyContent: "center", padding: viewImg ? 12 : 0, transition: "all .3s" }}>
                                    <img src={viewImg ? currentImg : (editing && form?.invoice_thumb ? form.invoice_thumb : (tx.invoice_thumb || currentImg))} alt="Hóa đơn" style={{
                                        width: viewImg ? "100%" : "auto", maxWidth: "100%", maxHeight: viewImg ? 500 : 80, objectFit: viewImg ? "contain" : "cover",
                                        display: "block", transition: "all .3s", borderRadius: viewImg ? "var(--radius-sm)" : "0"
                                    }} />
                                </div>
                                <div style={{ display: "flex", gap: 8, padding: "10px 12px", borderTop: "1px solid var(--border-light)", alignItems: "center" }}>
                                    <span style={{ flex: 1, fontSize: ".72rem", color: "var(--green)", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                                        ✓ Đã đính kèm
                                        <span style={{ fontWeight: 400, color: "var(--text-tertiary)", marginLeft: 4 }}>{viewImg ? "nhấn để thu nhỏ" : "nhấn để phóng to"}</span>
                                    </span>
                                    <button className="btn btn-secondary" style={{ padding: "4px 10px", fontSize: ".72rem" }} onClick={() => fileRef.current?.click()}><Icons.Camera /> Đổi</button>
                                    <button style={{ padding: "4px 10px", fontSize: ".72rem", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", background: "transparent", color: "var(--red)", cursor: "pointer", fontFamily: "var(--font)", display: "flex", alignItems: "center", gap: 3 }} onClick={removeImage}><Icons.Trash /> Xóa</button>
                                </div>
                            </div>
                        ) : (
                            <div onClick={() => fileRef.current?.click()} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "24px", border: "2px dashed var(--border)", borderRadius: "var(--radius-md)", cursor: "pointer", transition: "all .15s", background: "var(--bg-card)" }}>
                                {compressing ? (
                                    <><div style={{ width: 24, height: 24, border: "3px solid var(--border)", borderTopColor: "var(--accent)", borderRadius: "50%", animation: "spin .6s linear infinite" }} /><span style={{ fontSize: ".82rem", color: "var(--accent)", fontWeight: 600 }}>Đang nén ảnh...</span></>
                                ) : (
                                    <><Icons.Camera /><span style={{ fontSize: ".85rem", color: "var(--text-secondary)", fontWeight: 600 }}>Thêm ảnh hóa đơn</span>
                                        <span style={{ fontSize: ".72rem", color: "var(--text-tertiary)" }}>Chụp hoặc chọn từ thư viện · WebP ưu tiên · nén ≤40KB</span></>
                                )}
                            </div>
                        )}
                        <input ref={fileRef} type="file" accept="image/*" capture="environment" onChange={handleImageUpload} style={{ display: "none" }} />
                    </div>

                    {/* ID + timestamp */}
                    <div style={{ marginTop: 14, padding: "8px 12px", background: "var(--bg-elevated)", borderRadius: "var(--radius-sm)", fontSize: ".68rem", color: "var(--text-tertiary)", fontFamily: "var(--font-mono)", display: "flex", justifyContent: "space-between" }}>
                        <span>ID: {tx.id}</span>
                        <span>{tx.status === "confirmed" ? "✓ Xác nhận" : "Nháp"}</span>
                    </div>

                    {/* Action buttons */}
                    <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
                        <button className="btn btn-primary btn-lg" style={{ flex: 1, justifyContent: "center" }} onClick={startEdit}><Icons.Edit /> Sửa</button>
                        <button className="btn btn-lg" style={{ justifyContent: "center", background: "transparent", border: "1px solid var(--red)", color: "var(--red)", cursor: "pointer" }} onClick={() => setConfirmDelete(true)}><Icons.Trash /> Xóa</button>
                        <button className="btn btn-secondary btn-lg" style={{ flex: 1, justifyContent: "center" }} onClick={onClose}>Đóng</button>
                    </div>
                </div>
            )}
        </div>
    </div></div>);
}

// ═══════════════════════════════════════════════════════════════════════════════
// ADD TRANSACTION MODAL — with vat_group for income (§D)
// ═══════════════════════════════════════════════════════════════════════════════
function AddTransactionModal({ onClose, onSave, transactions, addToast, business, categories, wallets }) {
    const [form, setForm] = useState({ type: "expense", amount: "", description: "", tx_date: new Date().toISOString().split("T")[0], category_id: "", payment_method: wallets[0]?.id || "cash", has_invoice: false, counterparty: "", vat_group: business.default_vat_group || "service", invoice_img: null });
    const [showDup, setShowDup] = useState(false); const [errors, setErrors] = useState({});
    const [compressing, setCompressing] = useState(false);
    const fileRef = useRef(null);

    const cats = form.type === "income" ? categories.income : categories.expense;
    const suggestions = getSmartSuggestions(transactions, form.type, categories);
    const validate = () => { const e = {}; if (!form.amount) e.amount = "Vui lòng nhập số tiền"; if (!form.description.trim()) e.description = "Vui lòng nhập mô tả"; if (!form.category_id) e.category_id = "Chọn danh mục"; setErrors(e); return !Object.keys(e).length };
    const handleSave = (andNew) => {
        if (!validate()) return; const amt = parseInt(form.amount.replace(/\D/g, "")); const dup = detectDuplicate(transactions, { ...form, amount: amt }); if (dup && !showDup) { setShowDup(true); return } const cat = cats.find(c => c.id === form.category_id); const tx = { id: `tx-${Date.now()}`, ...form, amount: amt, category_name: cat?.name || "", status: "confirmed", reconciled: false, vat_group: form.type === "income" ? form.vat_group : undefined }; onSave(tx);
        const vg = VAT_GROUPS.find(g => g.id === form.vat_group);
        const taxEst = form.type === "income" && !business.isUnderGate ? Math.round(amt * (vg?.rate || 0.05)) : 0;
        addToast({ type: "success", title: `Đã lưu — ${form.type === "income" ? "Thu" : "Chi"} ${fmtVND(amt)}`, detail: taxEst > 0 ? `VAT ước tính: ${fmtVND(taxEst)} (${vg?.rateLabel})` : form.invoice_img ? "Kèm ảnh hóa đơn" : undefined });
        if (andNew) { setForm({ ...form, amount: "", description: "", category_id: "", has_invoice: false, counterparty: "", invoice_img: null, invoice_thumb: null, _imgInfo: null }); setShowDup(false); setErrors({}) } else onClose()
    };
    const handleAmt = e => { const raw = e.target.value.replace(/\D/g, ""); setForm({ ...form, amount: raw ? fmt(parseInt(raw)) : "" }); if (errors.amount) setErrors({ ...errors, amount: null }) };

    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setCompressing(true);
        try {
            const result = await compressImage(file);
            setForm(f => ({
                ...f, invoice_img: result.data, invoice_thumb: result.thumb, has_invoice: true,
                _imgInfo: {
                    sizeKB: result.sizeKB, originalKB: result.originalKB, width: result.width, height: result.height,
                    origWidth: result.origWidth, origHeight: result.origHeight, format: result.format, quality: result.quality, ratio: result.ratio
                }
            }));
            addToast({
                type: "success", title: `Ảnh nén ${result.format} thành công`,
                detail: `${result.origWidth}×${result.origHeight} → ${result.width}×${result.height} · ${result.originalKB}KB → ${result.sizeKB}KB (−${result.ratio}%) · Q${result.quality}`
            });
        } catch (err) {
            addToast({ type: "warning", title: "Không thể nén ảnh", detail: err.message || "Vui lòng thử lại" });
        }
        setCompressing(false);
        if (fileRef.current) fileRef.current.value = "";

    };

    return (<div className="modal-overlay" onClick={onClose}><div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header"><h2 className="modal-title">{form.type === "income" ? "Thêm khoản thu" : "Thêm khoản chi"}</h2><button className="modal-close" onClick={onClose}><Icons.X /></button></div>
        <div className="modal-body">
            <div className="type-picker"><div className={`type-option income ${form.type === "income" ? "active" : ""}`} onClick={() => setForm({ ...form, type: "income", category_id: "" })}>↗ Thu</div><div className={`type-option expense ${form.type === "expense" ? "active" : ""}`} onClick={() => setForm({ ...form, type: "expense", category_id: "" })}>↙ Chi</div></div>

            {showDup && <div className="duplicate-warning"><span style={{ fontSize: "1.2rem" }}>⚠️</span><div style={{ flex: 1 }}><div style={{ fontWeight: 600, fontSize: ".88rem" }}>Có vẻ giao dịch này đã được ghi</div><div style={{ fontSize: ".78rem", color: "var(--text-secondary)" }}>Bạn có muốn tạo bản sao không?</div></div><button className="btn btn-sm btn-secondary" onClick={() => { setShowDup(false); handleSave() }}>Lưu bản sao</button></div>}

            <div className="field"><label className="field-label">Số tiền (VND)</label><input className="field-input field-input-money" placeholder="0" value={form.amount} onChange={handleAmt} autoFocus style={errors.amount ? { borderColor: "var(--red)" } : {}} />{errors.amount && <div className="field-error">{errors.amount}</div>}</div>
            <div className="field"><label className="field-label">Mô tả</label><input className="field-input" placeholder="VD: Mua nguyên liệu..." value={form.description} onChange={e => { setForm({ ...form, description: e.target.value }); if (errors.description) setErrors({ ...errors, description: null }) }} style={errors.description ? { borderColor: "var(--red)" } : {}} />{errors.description && <div className="field-error">{errors.description}</div>}</div>

            {/* VAT Group picker — §D: mỗi transaction doanh thu cần gắn vat_group */}
            {form.type === "income" && (
                <div className="field" style={{ animation: "slideDown .3s ease-out" }}>
                    <label className="field-label">Nhóm VAT (TT69/2025)</label>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                        {VAT_GROUPS.map(g => (<div key={g.id} onClick={() => setForm({ ...form, vat_group: g.id })} style={{ padding: "10px 12px", borderRadius: "var(--radius-md)", border: `2px solid ${form.vat_group === g.id ? "var(--accent)" : "var(--border)"}`, background: form.vat_group === g.id ? "var(--accent-light)" : "var(--bg-card)", cursor: "pointer", transition: "all .15s" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontSize: "1.1rem" }}>{g.icon}</span><span style={{ fontFamily: "var(--font-mono)", fontSize: ".75rem", fontWeight: 700, color: form.vat_group === g.id ? "var(--accent)" : "var(--text-tertiary)" }}>{g.rateLabel}</span></div>
                            <div style={{ fontSize: ".75rem", fontWeight: 600, marginTop: 4 }}>{g.label}</div>
                        </div>))}
                    </div>
                </div>
            )}

            <div className="field">{errors.category_id && <div className="field-error" style={{ marginBottom: 6 }}>{errors.category_id}</div>}<label className="field-label">Danh mục{suggestions.length > 0 && <span style={{ fontWeight: 400, marginLeft: 8, color: "var(--text-tertiary)" }}>(gợi ý)</span>}</label><div className="cat-grid">{cats.map(cat => { const isSug = suggestions.some(s => s.id === cat.id) && form.category_id !== cat.id; return (<div key={cat.id} className={`cat-item ${form.category_id === cat.id ? "active" : isSug ? "suggested" : ""}`} onClick={() => { setForm({ ...form, category_id: cat.id }); if (errors.category_id) setErrors({ ...errors, category_id: null }) }}><div className="cat-item-icon">{cat.icon}</div>{cat.name}</div>) })}</div></div>

            <div className="field-row">
                <div className="field"><label className="field-label">Ngày</label><input className="field-input" type="date" value={form.tx_date} onChange={e => setForm({ ...form, tx_date: e.target.value })} /></div>
                <div className="field"><label className="field-label">Thanh toán</label>
                    <select className="field-input" value={form.payment_method} onChange={e => setForm({ ...form, payment_method: e.target.value })}>
                        {wallets.map(w => (<option key={w.id} value={w.id}>{w.icon} {w.name}</option>))}
                    </select>
                </div>
            </div>

            {/* Invoice section with image upload */}
            {form.type === "expense" && (<div className="field-toggle-row"><div><div style={{ fontWeight: 600, fontSize: ".88rem" }}>Có hóa đơn?</div><div style={{ fontSize: ".72rem", color: "var(--text-tertiary)", marginTop: 2 }}>Chi phí có hóa đơn được khấu trừ thuế</div></div><button className={`toggle ${form.has_invoice ? "on" : ""}`} onClick={() => setForm({ ...form, has_invoice: !form.has_invoice })} /></div>)}
            {form.has_invoice && (
                <div style={{ animation: "slideDown .3s ease-out" }}>
                    <div className="field"><label className="field-label">Đối tác</label><input className="field-input" placeholder="Tên đối tác (tùy chọn)" value={form.counterparty} onChange={e => setForm({ ...form, counterparty: e.target.value })} /></div>
                    {/* Image upload */}
                    <div className="field">
                        <label className="field-label">Ảnh hóa đơn <span style={{ fontWeight: 400, color: "var(--text-tertiary)" }}>(WebP/JPEG · nén tự động ≤40KB)</span></label>
                        {form.invoice_img ? (
                            <div style={{ borderRadius: "var(--radius-md)", border: "1px solid var(--border-light)", overflow: "hidden", background: "var(--bg-elevated)" }}>
                                <div style={{ display: "flex", gap: 12, alignItems: "center", padding: "10px 14px" }}>
                                    <img src={form.invoice_thumb || form.invoice_img} alt="HĐ" style={{ width: 56, height: 56, objectFit: "cover", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", flexShrink: 0 }} />
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ fontWeight: 600, fontSize: ".82rem", color: "var(--green)", marginBottom: 2 }}>✓ Đã đính kèm</div>
                                        {form._imgInfo && (
                                            <div style={{ fontSize: ".68rem", color: "var(--text-tertiary)", lineHeight: 1.5 }}>
                                                <span style={{ fontWeight: 600, color: "var(--accent)" }}>{form._imgInfo.format}</span> · {form._imgInfo.width}×{form._imgInfo.height}px · {form._imgInfo.sizeKB}KB
                                                <br />{form._imgInfo.origWidth}×{form._imgInfo.origHeight} → nén −{form._imgInfo.ratio}% (Q{form._imgInfo.quality})
                                            </div>
                                        )}
                                    </div>
                                    <button className="btn btn-secondary" style={{ padding: "6px 10px", fontSize: ".72rem", flexShrink: 0 }} onClick={() => setForm({ ...form, invoice_img: null, invoice_thumb: null, _imgInfo: null })}><Icons.Trash /> Xóa</button>
                                </div>
                            </div>
                        ) : compressing ? (
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "20px", border: "2px dashed var(--border)", borderRadius: "var(--radius-md)", background: "var(--bg-card)" }}>
                                <div style={{ width: 24, height: 24, border: "3px solid var(--border)", borderTopColor: "var(--accent)", borderRadius: "50%", animation: "spin .6s linear infinite" }} />
                                <span style={{ fontSize: ".82rem", color: "var(--accent)", fontWeight: 600 }}>Đang nén ảnh...</span>
                            </div>
                        ) : (
                            <button type="button" onClick={() => fileRef.current?.click()} style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "16px 10px", border: "2px dashed var(--border)", borderRadius: "var(--radius-md)", cursor: "pointer", background: "var(--bg-card)", transition: "all .15s" }}>
                                <span style={{ fontSize: "1.4rem" }}>📁</span>
                                <span style={{ fontSize: ".78rem", fontWeight: 600, color: "var(--text-primary)" }}>Tải ảnh hóa đơn</span>
                                <span style={{ fontSize: ".62rem", color: "var(--text-tertiary)" }}>Chọn từ thư viện · WebP ưu tiên · nén ≤40KB</span>
                            </button>
                        )}

                        <input ref={fileRef} type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} />
                    </div>
                </div>
            )}

            <div style={{ display: "flex", gap: 10, marginTop: 8 }}><button className="btn btn-primary btn-lg" style={{ flex: 1, justifyContent: "center" }} onClick={() => handleSave(false)}>Lưu giao dịch</button><button className="btn btn-success btn-lg" style={{ justifyContent: "center", whiteSpace: "nowrap" }} onClick={() => handleSave(true)}>Lưu + Tạo mới</button></div>
        </div>
    </div></div>);
}

// ═══════════════════════════════════════════════════════════════════════════════
// TAX PREVIEW — Full 2026 rules: Tax Gate, VAT by group, PIT method, Ledgers
// ═══════════════════════════════════════════════════════════════════════════════
// S2c expense classification mapping per TT152/2025/TT-BTC
// S2c expense grouping — now uses s2c_group from category, not hardcoded catIds
// getCatIdsForGroup: dynamically resolves category IDs that belong to a S2c group
function getCatIdsForGroup(groupCode, expenseCategories) {
    return expenseCategories.filter(c => c.s2c_group === groupCode).map(c => c.id);
}
const S2C_EXPENSE_MAP = S2C_GROUPS.map(g => ({
    code: g.code,
    label: g.label,
    shortLabel: g.shortLabel,
    color: g.color,
}));

const LEDGER_REPORTS = [
    { id: "s1a", code: "S1a-HKD", title: "Sổ doanh thu bán hàng hóa, dịch vụ", desc: "Ghi nhận toàn bộ doanh thu theo thời gian", color: "#2D9F6F", bgColor: "#EDFAF3", icon: "📗", groups: [1] },
    { id: "s2a", code: "S2a-HKD", title: "Sổ doanh thu theo nhóm ngành nghề", desc: "Chi tiết doanh thu, thuế GTGT và thuế TNCN theo từng nhóm ngành", color: "#3B7DD8", bgColor: "#EEF4FC", icon: "📘", groups: [2] },
    { id: "s2b", code: "S2b-HKD", title: "Sổ doanh thu bán hàng hóa, dịch vụ", desc: "Doanh thu theo nhóm ngành — kèm thuế GTGT (không tính PIT ở đây)", color: "#3B7DD8", bgColor: "#EEF4FC", icon: "📘", groups: [3] },
    { id: "s2c", code: "S2c-HKD", title: "Sổ chi tiết doanh thu, chi phí", desc: "Tổng hợp thu chi, phân loại chi phí hợp lý theo 6 nhóm TT152", color: "#D94040", bgColor: "#FFF0F0", icon: "📕", groups: [3] },
    { id: "s2d", code: "S2d-HKD", title: "Sổ chi tiết vật liệu, sản phẩm, hàng hóa", desc: "Nhập/xuất/tồn kho — bình quân gia quyền", color: "#9B59B6", bgColor: "#F5EEFF", icon: "📦", groups: [3] },
    { id: "s2e", code: "S2e-HKD", title: "Sổ chi tiết tiền", desc: "Theo dõi tiền mặt và tiền gửi ngân hàng", color: "#E5A10E", bgColor: "#FFF9EB", icon: "📒", groups: [3] },
];

// Determine HKD tax group per Nghị định thuế HKD 2026
function getTaxGroup(business, pitMethod) {
    const isUnder500m = business.revenue_tier === "under_500m";
    if (isUnder500m) return 1;
    if (pitMethod === "REV_PCT") return 2;
    return 3; // PROFIT method
}

const TAX_GROUP_INFO = {
    1: {
        label: "Nhóm 1",
        title: "HKD doanh thu ≤ 500 triệu/năm",
        color: "var(--green)",
        bg: "var(--green-light)",
        icon: "🛡️",
        taxDesc: "Miễn thuế GTGT, miễn thuế TNCN",
        ledgerDesc: "Chỉ cần 01 sổ kế toán duy nhất",
        requiredIds: ["s1a"],
        notes: [
            "Được miễn thuế GTGT và thuế TNCN",
            "Vẫn phải ghi sổ kế toán (S1a-HKD)",
            "Vẫn có trách nhiệm kê khai thuế",
            "Không bắt buộc dùng hóa đơn điện tử từ máy tính tiền",
            "Không bắt buộc có hóa đơn đầu vào, nhưng thiếu HĐ sẽ tiềm ẩn rủi ro",
        ],
    },
    2: {
        label: "Nhóm 2",
        title: "HKD nộp thuế GTGT + TNCN theo % doanh thu",
        color: "var(--blue)",
        bg: "var(--blue-light)",
        icon: "📊",
        taxDesc: "VAT theo % doanh thu + PIT theo % doanh thu (trừ 500M trước)",
        ledgerDesc: "Chỉ cần 01 sổ kế toán duy nhất",
        requiredIds: ["s2a"],
        notes: [
            "Thuế GTGT tính theo tỷ lệ % trên doanh thu theo nhóm ngành",
            "Thuế TNCN tính theo tỷ lệ % trên doanh thu (được trừ 500 triệu trước)",
            "Đơn giản nhất cho HKD doanh thu 500M–3 tỷ",
            "Chỉ cần 1 sổ: S2a-HKD ghi doanh thu theo nhóm ngành",
        ],
    },
    3: {
        label: "Nhóm 3",
        title: "HKD nộp thuế GTGT theo % DT + TNCN theo lợi nhuận",
        color: "var(--accent)",
        bg: "var(--accent-light)",
        icon: "📋",
        taxDesc: "VAT theo % doanh thu + PIT theo thu nhập tính thuế (lợi nhuận)",
        ledgerDesc: "Cần 04 sổ kế toán bắt buộc",
        requiredIds: ["s2b", "s2c", "s2d", "s2e"],
        notes: [
            "Thuế GTGT tính theo tỷ lệ % trên doanh thu theo nhóm ngành",
            "Thuế TNCN tính trên thu nhập tính thuế = Doanh thu − Chi phí hợp lý",
            "Phải ghi đầy đủ 4 sổ: S2b + S2c + S2d + S2e",
            "Chi phí hợp lý phải có hóa đơn, chứng từ hợp lệ",
            "Phù hợp cho HKD muốn khấu trừ chi phí lớn (lợi nhuận thấp hơn DT)",
        ],
    },
};

// ─── Ledger Detail Modal ─────────────────────────────────────────────────────
function LedgerDetailModal({ ledgerId, onClose, transactions, business, inventory, addToast, categories }) {
    const tax = computeTax2026(transactions, business);
    const incTx = transactions.filter(t => t.type === "income").sort((a, b) => a.tx_date.localeCompare(b.tx_date));
    const expTx = transactions.filter(t => t.type === "expense").sort((a, b) => a.tx_date.localeCompare(b.tx_date));
    const allTx = [...transactions].sort((a, b) => a.tx_date.localeCompare(b.tx_date));
    const r = LEDGER_REPORTS.find(l => l.id === ledgerId);

    const handleExport = () => {
        const exportMap = {
            s1a: () => exportS1a(transactions, business),
            s2a: () => exportS2b(transactions, business),
            s2b: () => exportS2b(transactions, business),
            s2c: () => exportS2c(transactions, business, categories?.expense),
            s2d: () => exportS2d(inventory, business),
            s2e: () => exportS2e(transactions, business),
        };
        if (exportMap[ledgerId]) {
            exportMap[ledgerId]();
            addToast({ type: "success", title: `Đã xuất ${r?.code}`, detail: "CSV tải về + In sổ đã mở" });
        }
    };

    // Common ledger table style
    const ths = { padding: "8px 10px", fontSize: ".72rem", fontWeight: 700, borderBottom: "2px solid var(--border)", background: "var(--bg-elevated)", textAlign: "left", whiteSpace: "nowrap" };
    const tds = { padding: "7px 10px", fontSize: ".78rem", borderBottom: "1px solid var(--border-light)" };
    const tdr = { ...tds, textAlign: "right", fontFamily: "var(--font-mono)", fontWeight: 600 };
    const thc = { ...ths, textAlign: "center" };
    const tdc = { ...tds, textAlign: "center" };
    const hdrRow = { background: "var(--bg-warm)", fontWeight: 700, fontSize: ".82rem" };

    // ──── S1a: Simple revenue log ────
    const renderS1a = () => {
        let stt = 0; const total = incTx.reduce((s, t) => s + t.amount, 0);
        return (<table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr><th style={thc}>STT</th><th style={ths}>Ngày tháng</th><th style={ths}>Diễn giải</th><th style={{ ...ths, textAlign: "right" }}>Số tiền</th></tr>
                <tr style={{ fontSize: ".68rem", color: "var(--text-tertiary)" }}><td style={tdc}></td><td style={tds}>A</td><td style={tds}>B</td><td style={tdr}>1</td></tr>
            </thead>
            <tbody>
                {incTx.map(tx => (
                    <tr key={tx.id}><td style={tdc}>{++stt}</td><td style={tds}>{fmtDate(tx.tx_date)}</td><td style={tds}>{tx.description}{tx.counterparty ? ` — ${tx.counterparty}` : ""}</td><td style={tdr}>{fmtVND(tx.amount)}</td></tr>
                ))}
                <tr style={hdrRow}><td style={tdc} colSpan={2}></td><td style={{ ...tds, fontWeight: 700 }}>Tổng cộng</td><td style={{ ...tdr, fontWeight: 800, color: "var(--green)" }}>{fmtVND(total)}</td></tr>
            </tbody>
        </table>);
    };

    // ──── S2a: Revenue by industry group ────
    const renderS2a = () => {
        const groups = VAT_GROUPS.map(g => {
            const txs = incTx.filter(t => t.vat_group === g.id);
            const total = txs.reduce((s, t) => s + t.amount, 0);
            return { group: g, txs, total, vat: Math.round(total * g.rate), pit: Math.round(total * g.pitRevPct) };
        }).filter(g => g.txs.length > 0);
        let totalVat = 0, totalPit = 0;
        return (<table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr><th style={ths}>Số hiệu</th><th style={ths}>Ngày, tháng</th><th style={{ ...ths, minWidth: 200 }}>Diễn giải</th><th style={{ ...ths, textAlign: "right" }}>Số tiền</th></tr>
                <tr style={{ fontSize: ".68rem", color: "var(--text-tertiary)" }}><td style={tds}>A</td><td style={tds}>B</td><td style={tds}>C</td><td style={tdr}>1</td></tr>
            </thead>
            <tbody>
                {groups.map((g, gi) => {
                    totalVat += g.vat; totalPit += g.pit;
                    return (<React.Fragment key={g.group.id}>
                        <tr style={{ ...hdrRow, background: g.group.id === "service" ? "#EEF4FC" : g.group.id === "distribution" ? "#EDFAF3" : g.group.id === "production" ? "#FFF9EB" : "#F5EEFF" }}>
                            <td style={tds} colSpan={2}></td><td style={{ ...tds, fontWeight: 700 }}>{gi + 1}. Ngành nghề: {g.group.icon} {g.group.label}</td><td style={tdr}></td>
                        </tr>
                        {g.txs.map(tx => (
                            <tr key={tx.id}><td style={tds}></td><td style={tds}>{fmtDate(tx.tx_date)}</td><td style={{ ...tds, paddingLeft: 20 }}>{tx.description}</td><td style={tdr}>{fmtVND(tx.amount)}</td></tr>
                        ))}
                        <tr style={{ fontWeight: 600, background: "var(--bg-elevated)" }}>
                            <td style={tds} colSpan={2}></td><td style={{ ...tds, fontWeight: 700, paddingLeft: 20 }}>Tổng cộng ({gi + 1})</td><td style={{ ...tdr, fontWeight: 700 }}>{fmtVND(g.total)}</td>
                        </tr>
                        <tr><td style={tds} colSpan={2}></td><td style={{ ...tds, paddingLeft: 20, color: "var(--accent)" }}>Thuế GTGT ({g.group.rateLabel})</td><td style={{ ...tdr, color: "var(--accent)" }}>{fmtVND(g.vat)}</td></tr>
                        <tr><td style={tds} colSpan={2}></td><td style={{ ...tds, paddingLeft: 20, color: "var(--blue)" }}>Thuế TNCN</td><td style={{ ...tdr, color: "var(--blue)" }}>{fmtVND(g.pit)}</td></tr>
                    </React.Fragment>);
                })}
                <tr style={{ ...hdrRow, borderTop: "2px solid var(--border)" }}><td style={tds} colSpan={2}></td><td style={{ ...tds, fontWeight: 800 }}>Tổng số thuế GTGT phải nộp</td><td style={{ ...tdr, fontWeight: 800, color: "var(--accent)" }}>{fmtVND(totalVat)}</td></tr>
                <tr style={hdrRow}><td style={tds} colSpan={2}></td><td style={{ ...tds, fontWeight: 800 }}>Tổng số thuế TNCN phải nộp</td><td style={{ ...tdr, fontWeight: 800, color: "var(--blue)" }}>{fmtVND(totalPit)}</td></tr>
            </tbody>
        </table>);
    };

    // ──── S2c: Revenue & Expenses with official subcategories ────
    const renderS2c = () => {
        const totalRevenue = incTx.reduce((s, t) => s + t.amount, 0);
        const deductible = expTx.filter(t => t.has_invoice);
        const totalDeductible = deductible.reduce((s, t) => s + t.amount, 0);
        const profit = totalRevenue - totalDeductible;
        const pitRate = tax.pitMethod === "PROFIT" ? (tax.annualRevenue <= 3000000000 ? 0.15 : tax.annualRevenue <= 50000000000 ? 0.17 : 0.20) : 0;
        const pitAmount = tax.pitMethod === "PROFIT" ? Math.round(Math.max(0, profit) * pitRate) : tax.pit;

        // Build category lookup: catId → s2c_group
        const catLookup = {};
        (categories?.expense || []).forEach(c => { if (c.s2c_group) catLookup[c.id] = c.s2c_group });

        // Group expenses by S2c groups dynamically
        const expGroups = S2C_GROUPS.map(g => {
            const matched = deductible.filter(t => catLookup[t.category_id] === g.code);
            return { ...g, txs: matched, total: matched.reduce((s, t) => s + t.amount, 0) };
        });
        // Unclassified → group "e"
        const classified = new Set(Object.keys(catLookup).filter(id => catLookup[id]));
        const unclassified = deductible.filter(t => !catLookup[t.category_id]);
        if (unclassified.length > 0) {
            const eGroup = expGroups.find(g => g.code === "e");
            if (eGroup) { eGroup.txs = [...eGroup.txs, ...unclassified]; eGroup.total += unclassified.reduce((s, t) => s + t.amount, 0); }
        }

        return (<table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr><th style={ths}>Số hiệu</th><th style={ths}>Ngày, tháng</th><th style={{ ...ths, minWidth: 250 }}>Diễn giải</th><th style={{ ...ths, textAlign: "right" }}>Số tiền</th></tr>
                <tr style={{ fontSize: ".68rem", color: "var(--text-tertiary)" }}><td style={tds}>A</td><td style={tds}>B</td><td style={tds}>C</td><td style={tdr}>1</td></tr>
            </thead>
            <tbody>
                {/* 1. Revenue */}
                <tr style={{ ...hdrRow, background: "#EDFAF3" }}><td style={tds} colSpan={2}></td><td style={{ ...tds, fontWeight: 800, color: "var(--green)" }}>1. Doanh thu bán hàng hóa, dịch vụ</td><td style={{ ...tdr, fontWeight: 800, color: "var(--green)" }}>{fmtVND(totalRevenue)}</td></tr>
                {incTx.map(tx => (
                    <tr key={tx.id}><td style={tds}></td><td style={tds}>{fmtDate(tx.tx_date)}</td><td style={{ ...tds, paddingLeft: 20 }}>{tx.description}</td><td style={tdr}>{fmtVND(tx.amount)}</td></tr>
                ))}

                {/* 2. Expenses by subcategory */}
                <tr style={{ ...hdrRow, background: "#FFF0F0" }}><td style={tds} colSpan={2}></td><td style={{ ...tds, fontWeight: 800, color: "var(--accent)" }}>2. Chi phí hợp lý</td><td style={{ ...tdr, fontWeight: 800, color: "var(--accent)" }}>{fmtVND(totalDeductible)}</td></tr>

                {expGroups.map(g => (
                    <React.Fragment key={g.code}>
                        <tr style={{ background: "var(--bg-elevated)" }}><td style={tds} colSpan={2}></td>
                            <td style={{ ...tds, fontWeight: 600, fontSize: ".78rem", color: "var(--text-secondary)", paddingLeft: 12 }}>{g.code}) {g.label}</td>
                            <td style={{ ...tdr, fontWeight: 600, color: g.total > 0 ? "var(--accent)" : "var(--text-tertiary)" }}>{g.total > 0 ? fmtVND(g.total) : "—"}</td>
                        </tr>
                        {g.txs.map(tx => (
                            <tr key={tx.id}><td style={tds}></td><td style={tds}>{fmtDate(tx.tx_date)}</td><td style={{ ...tds, paddingLeft: 28, fontSize: ".76rem" }}>{tx.description}{tx.counterparty ? ` (${tx.counterparty})` : ""}</td><td style={tdr}>{fmtVND(tx.amount)}</td></tr>
                        ))}
                    </React.Fragment>
                ))}

                {/* 3. Profit */}
                <tr style={{ ...hdrRow, borderTop: "2px solid var(--border)" }}><td style={tds} colSpan={2}></td><td style={{ ...tds, fontWeight: 800 }}>3. Chênh lệch {"{(3) = (1) - (2)}"}</td><td style={{ ...tdr, fontWeight: 800, color: profit >= 0 ? "var(--blue)" : "var(--red)" }}>{fmtVND(profit)}</td></tr>

                {/* 4. PIT */}
                <tr style={hdrRow}><td style={tds} colSpan={2}></td><td style={{ ...tds, fontWeight: 800 }}>4. Tổng số thuế TNCN phải nộp {tax.pitMethod === "PROFIT" ? `{(4) = (3) × ${(pitRate * 100)}%}` : ""}</td><td style={{ ...tdr, fontWeight: 800, color: "var(--blue)" }}>{tax.isUnderGate ? "Miễn" : fmtVND(pitAmount)}</td></tr>
            </tbody>
        </table>);
    };

    // ──── S2d: Inventory ────
    const renderS2d = () => {
        if (!inventory || inventory.length === 0) return (<div className="empty-state"><div className="empty-icon">📦</div><div className="empty-text">Chưa có dữ liệu tồn kho</div></div>);
        return inventory.map(item => {
            const calc = calcInventory(item);
            return (<div key={item.id} style={{ marginBottom: 20 }}>
                <div style={{ fontWeight: 700, fontSize: ".88rem", marginBottom: 8, padding: "8px 12px", background: "var(--bg-elevated)", borderRadius: "var(--radius-sm)" }}>
                    Tên hàng hóa: <span style={{ color: "var(--accent)" }}>{item.name}</span> — ĐVT: {item.unit}
                </div>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr><th style={ths} rowSpan={2}>Số hiệu</th><th style={ths} rowSpan={2}>Ngày</th><th style={ths} rowSpan={2}>Diễn giải</th><th style={thc} rowSpan={2}>ĐVT</th><th style={thc} rowSpan={2}>Đơn giá</th><th style={thc} colSpan={2}>Nhập</th><th style={thc} colSpan={2}>Xuất</th><th style={thc} colSpan={2}>Tồn</th></tr>
                        <tr><th style={thc}>SL</th><th style={thc}>TT</th><th style={thc}>SL</th><th style={thc}>TT</th><th style={thc}>SL</th><th style={thc}>TT</th></tr>
                        <tr style={{ fontSize: ".65rem", color: "var(--text-tertiary)" }}><td style={tdc}>A</td><td style={tdc}>B</td><td style={tdc}>C</td><td style={tdc}>D</td><td style={tdc}>1</td><td style={tdc}>2</td><td style={tdc}>3</td><td style={tdc}>4</td><td style={tdc}>5</td><td style={tdc}>6</td><td style={tdc}>7</td></tr>
                    </thead>
                    <tbody>
                        <tr style={{ fontStyle: "italic", background: "var(--bg-warm)" }}><td style={tds} colSpan={4}></td><td style={tds} colSpan={5}>Số dư đầu kỳ</td><td style={tdr}>{item.opening_qty}</td><td style={tdr}>{fmtVND(item.opening_value)}</td></tr>
                        {calc.rows.map((mv, i) => (
                            <tr key={i}><td style={tds}>{mv.doc}</td><td style={tds}>{fmtDate(mv.date)}</td><td style={tds}>{mv.desc}</td><td style={tdc}>{item.unit}</td>
                                <td style={tdr}>{fmt(mv.unitPrice)}</td>
                                <td style={tdr}>{mv.inQty || ""}</td><td style={tdr}>{mv.inVal ? fmtVND(mv.inVal) : ""}</td>
                                <td style={tdr}>{mv.outQty || ""}</td><td style={tdr}>{mv.outVal ? fmtVND(mv.outVal) : ""}</td>
                                <td style={tdr}>{mv.stockQty}</td><td style={tdr}>{fmtVND(mv.stockVal)}</td>
                            </tr>
                        ))}
                        <tr style={hdrRow}><td style={tds} colSpan={4}></td><td style={{ ...tds, fontWeight: 700 }}>Cộng phát sinh</td>
                            <td style={tdr}>{calc.rows.filter(r => r.inQty).reduce((s, r) => s + r.inQty, 0)}</td><td style={tdr}>{fmtVND(calc.rows.filter(r => r.inVal).reduce((s, r) => s + r.inVal, 0))}</td>
                            <td style={tdr}>{calc.rows.filter(r => r.outQty).reduce((s, r) => s + r.outQty, 0)}</td><td style={tdr}>{fmtVND(calc.rows.filter(r => r.outVal).reduce((s, r) => s + r.outVal, 0))}</td>
                            <td style={tdc} colSpan={2}>×</td>
                        </tr>
                        <tr style={{ ...hdrRow, background: "var(--accent-light)" }}><td style={tds} colSpan={4}></td><td style={{ ...tds, fontWeight: 800 }} colSpan={5}>Số dư cuối kỳ</td><td style={{ ...tdr, fontWeight: 800 }}>{calc.endQty}</td><td style={{ ...tdr, fontWeight: 800, color: "var(--accent)" }}>{fmtVND(calc.endVal)}</td></tr>
                    </tbody>
                </table>
            </div>);
        });
    };

    // ──── S2e: Cash & Bank ────
    const renderS2e = () => {
        const cashTx = allTx.filter(t => t.payment_method === "cash");
        const bankTx = allTx.filter(t => t.payment_method === "bank_transfer");

        const renderSection = (label, txs, openBal) => {
            let running = openBal;
            const cashIn = txs.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0);
            const cashOut = txs.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0);
            return (<>
                <tr style={{ ...hdrRow, background: "var(--bg-elevated)" }}><td style={tds} colSpan={2}></td><td style={{ ...tds, fontWeight: 800 }}>{label}</td><td style={tdr}></td><td style={tdr}></td></tr>
                <tr style={{ fontStyle: "italic" }}><td style={tds} colSpan={2}></td><td style={{ ...tds, fontWeight: 600 }}>{label.includes("gửi") ? "Tiền gửi đầu kỳ" : "Tiền mặt đầu kỳ"}</td><td style={tdr} colSpan={2}>{fmtVND(openBal)}</td></tr>
                {txs.map(tx => {
                    const isIn = tx.type === "income";
                    running += isIn ? tx.amount : -tx.amount;
                    return (<tr key={tx.id}><td style={tds}></td><td style={tds}>{fmtDate(tx.tx_date)}</td><td style={tds}>{tx.description}</td>
                        <td style={tdr}>{isIn ? fmtVND(tx.amount) : ""}</td>
                        <td style={tdr}>{!isIn ? fmtVND(tx.amount) : ""}</td>
                    </tr>);
                })}
                <tr style={{ fontWeight: 600 }}><td style={tds} colSpan={2}></td><td style={{ ...tds, fontWeight: 700 }}>Tổng {label.includes("gửi") ? "gửi vào" : "thu vào"} trong kỳ</td><td style={{ ...tdr, color: "var(--green)" }}>{fmtVND(cashIn)}</td><td style={tdr}></td></tr>
                <tr style={{ fontWeight: 600 }}><td style={tds} colSpan={2}></td><td style={{ ...tds, fontWeight: 700 }}>Tổng {label.includes("gửi") ? "rút ra" : "chi ra"} trong kỳ</td><td style={tdr}></td><td style={{ ...tdr, color: "var(--accent)" }}>{fmtVND(cashOut)}</td></tr>
                <tr style={{ ...hdrRow, background: "var(--accent-light)" }}><td style={tds} colSpan={2}></td><td style={{ ...tds, fontWeight: 800 }}>{label.includes("gửi") ? "Tiền gửi cuối kỳ" : "Tiền mặt tồn cuối kỳ"}</td><td style={{ ...tdr, fontWeight: 800, color: "var(--blue)" }} colSpan={2}>{fmtVND(openBal + cashIn - cashOut)}</td></tr>
            </>);
        };

        return (<table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr><th style={ths}>Số hiệu</th><th style={ths}>Ngày tháng</th><th style={{ ...ths, minWidth: 200 }}>Diễn giải</th><th style={{ ...ths, textAlign: "right" }}>Thu / Gửi vào</th><th style={{ ...ths, textAlign: "right" }}>Chi / Rút ra</th></tr>
                <tr style={{ fontSize: ".68rem", color: "var(--text-tertiary)" }}><td style={tds}>A</td><td style={tds}>B</td><td style={tds}>C</td><td style={tdr}>1</td><td style={tdr}>2</td></tr>
            </thead>
            <tbody>
                {renderSection("Tiền mặt", cashTx, business.cash_balance || 0)}
                {renderSection("Tiền gửi không kỳ hạn — Ngân hàng", bankTx, business.bank_balance || 0)}
            </tbody>
        </table>);
    };

    // ──── S2b: Revenue by group — VAT only (Group 3, no PIT here) ────
    const renderS2b = () => {
        const groups = VAT_GROUPS.map(g => {
            const txs = incTx.filter(t => t.vat_group === g.id);
            const total = txs.reduce((s, t) => s + t.amount, 0);
            return { group: g, txs, total, vat: Math.round(total * g.rate) };
        }).filter(g => g.txs.length > 0);
        let totalVat = 0;
        return (<table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr><th style={ths}>Số hiệu</th><th style={ths}>Ngày, tháng</th><th style={{ ...ths, minWidth: 200 }}>Diễn giải</th><th style={{ ...ths, textAlign: "right" }}>Số tiền</th></tr>
                <tr style={{ fontSize: ".68rem", color: "var(--text-tertiary)" }}><td style={tds}>A</td><td style={tds}>B</td><td style={tds}>C</td><td style={tdr}>1</td></tr>
            </thead>
            <tbody>
                {groups.map((g, gi) => {
                    totalVat += g.vat;
                    return (<React.Fragment key={g.group.id}>
                        <tr style={{ ...hdrRow, background: g.group.id === "service" ? "#EEF4FC" : g.group.id === "distribution" ? "#EDFAF3" : g.group.id === "production" ? "#FFF9EB" : "#F5EEFF" }}>
                            <td style={tds} colSpan={2}></td><td style={{ ...tds, fontWeight: 700 }}>{gi + 1}. Ngành nghề: {g.group.icon} {g.group.label}</td><td style={tdr}></td>
                        </tr>
                        {g.txs.map(tx => (
                            <tr key={tx.id}><td style={tds}></td><td style={tds}>{fmtDate(tx.tx_date)}</td><td style={{ ...tds, paddingLeft: 20 }}>{tx.description}</td><td style={tdr}>{fmtVND(tx.amount)}</td></tr>
                        ))}
                        <tr style={{ fontWeight: 600, background: "var(--bg-elevated)" }}>
                            <td style={tds} colSpan={2}></td><td style={{ ...tds, fontWeight: 700, paddingLeft: 20 }}>Tổng cộng ({gi + 1})</td><td style={{ ...tdr, fontWeight: 700 }}>{fmtVND(g.total)}</td>
                        </tr>
                        <tr><td style={tds} colSpan={2}></td><td style={{ ...tds, paddingLeft: 20, color: "var(--accent)" }}>Thuế GTGT ({g.group.rateLabel})</td><td style={{ ...tdr, color: "var(--accent)" }}>{fmtVND(g.vat)}</td></tr>
                    </React.Fragment>);
                })}
                <tr style={{ ...hdrRow, borderTop: "2px solid var(--border)" }}><td style={tds} colSpan={2}></td><td style={{ ...tds, fontWeight: 800 }}>Tổng số thuế GTGT phải nộp</td><td style={{ ...tdr, fontWeight: 800, color: "var(--accent)" }}>{fmtVND(totalVat)}</td></tr>
            </tbody>
        </table>);
    };

    const renderMap = { s1a: renderS1a, s2a: renderS2a, s2b: renderS2b, s2c: renderS2c, s2d: renderS2d, s2e: renderS2e };

    return (<div className="modal-overlay" onClick={onClose}><div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 920, maxHeight: "90vh", display: "flex", flexDirection: "column" }}>
        <div className="modal-header" style={{ flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: "1.5rem" }}>{r?.icon}</span>
                <div><h2 className="modal-title" style={{ margin: 0 }}>{r?.code}</h2><div style={{ fontSize: ".75rem", color: "var(--text-tertiary)" }}>{r?.title}</div></div>
            </div>
            <button className="modal-close" onClick={onClose}><Icons.X /></button>
        </div>

        {/* Ledger header info */}
        <div style={{ padding: "12px 24px", background: "var(--bg-elevated)", borderBottom: "1px solid var(--border-light)", fontSize: ".78rem", display: "flex", flexWrap: "wrap", gap: "8px 20px", flexShrink: 0 }}>
            <span><strong>HKD:</strong> {business.name || "..."}</span>
            <span><strong>MST:</strong> {business.tax_id || "..."}</span>
            <span><strong>Địa chỉ:</strong> {business.address || "..."}</span>
            <span><strong>Kỳ kê khai:</strong> Q1/2026</span>
            <span style={{ marginLeft: "auto", fontStyle: "italic", color: "var(--text-tertiary)" }}>Mẫu theo TT152/2025/TT-BTC</span>
        </div>

        {/* Scrollable table body */}
        <div style={{ flex: 1, overflow: "auto", padding: "16px 24px" }}>
            {renderMap[ledgerId]?.()}
        </div>

        {/* Footer */}
        <div style={{ padding: "12px 24px", borderTop: "1px solid var(--border-light)", display: "flex", gap: 10, flexShrink: 0, background: "var(--bg-card)" }}>
            <div style={{ flex: 1, fontSize: ".72rem", color: "var(--text-tertiary)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <span>NGƯỜI ĐẠI DIỆN HỘ KINH DOANH / CÁ NHÂN KINH DOANH</span>
                <span style={{ fontStyle: "italic" }}>(Ký, ghi rõ họ tên và đóng dấu nếu có)</span>
            </div>
            <button className="btn btn-primary" style={{ gap: 6 }} onClick={handleExport}><Icons.Print /> In sổ & Tải CSV</button>
        </div>
    </div></div>);
}

function TaxPreview({ transactions, business, addToast, inventory, categories }) {
    const [locked, setLocked] = useState(false);
    const [period, setPeriod] = useState("q1");
    const [openLedger, setOpenLedger] = useState(null);

    // Filter transactions by period
    const periodTx = useMemo(() => {
        if (period === "q1") return transactions;
        const monthMap = { m1: "01", m2: "02", m3: "03" };
        const m = monthMap[period];
        if (!m) return transactions;
        return transactions.filter(t => t.tx_date && t.tx_date.slice(5, 7) === m);
    }, [transactions, period]);

    const tax = computeTax2026(periodTx, business);
    const activeGroups = Object.values(tax.vatByGroup).filter(g => g.revenue > 0);
    const periodLabel = period === "q1" ? "Q1/2026" : period === "m1" ? "Tháng 1/2026" : period === "m2" ? "Tháng 2/2026" : "Tháng 3/2026";

    return (<>
        <div className="page-header"><div><h1 className="page-title">Thuế & Báo cáo</h1><p className="page-subtitle">Luật 2026 — {periodLabel} · {periodTx.length} giao dịch</p></div>
            <div className="period-selector">{[{ id: "m1", label: "T1" }, { id: "m2", label: "T2" }, { id: "m3", label: "T3" }, { id: "q1", label: "Q1/2026" }].map(p => (<button key={p.id} className={`period-btn ${period === p.id ? "active" : ""}`} onClick={() => setPeriod(p.id)}>{p.label}</button>))}</div>
        </div>
        <div className="page-body">
            {locked && <div className="snapshot-banner fade-up"><Icons.Lock /> Báo cáo đã khóa — Snapshot Q1/2026 <button className="btn btn-secondary" onClick={() => { setLocked(false); addToast({ type: "warning", title: "Đã mở khóa", detail: "Bạn có thể chỉnh sửa dữ liệu." }) }} style={{ marginLeft: "auto", padding: "4px 12px", fontSize: ".75rem" }}><Icons.Unlock /> Mở khóa</button></div>}

            {/* ──── TAX GATE BANNER ──── */}
            <div className={`tax-gate-banner ${tax.isUnderGate ? "exempt" : "taxable"} fade-up`}>
                <span style={{ fontSize: "2rem" }}>{tax.isUnderGate ? "🛡️" : "📊"}</span>
                <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, fontSize: "1rem", marginBottom: 4 }}>{tax.isUnderGate ? "Doanh thu ≤ 500 triệu/năm — Miễn thuế" : "Doanh thu > 500 triệu/năm — Phải kê khai"}</div>
                    <div style={{ fontSize: ".82rem", color: "var(--text-secondary)" }}>
                        {tax.isUnderGate
                            ? "Theo Luật 109/2025/QH15: không chịu thuế GTGT, không nộp thuế TNCN. Chỉ cần lưu Sổ S1a."
                            : `Doanh thu ước tính: ${fmtVND(tax.annualRevenue)}/năm. Phải kê khai VAT theo nhóm + PIT ${tax.pitMethod === "PROFIT" ? "theo lợi nhuận" : "theo % doanh thu"}.`
                        }
                    </div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontWeight: 800, fontSize: "1.3rem", color: tax.isUnderGate ? "var(--green)" : "var(--accent)" }}>{tax.isUnderGate ? "0đ" : fmtVND(tax.totalTax)}</div>
                    <div style={{ fontSize: ".7rem", color: "var(--text-tertiary)" }}>tổng thuế kỳ này</div>
                </div>
            </div>

            {/* Môn bài / Khoán */}
            <div style={{ padding: "10px 16px", background: "var(--bg-elevated)", borderRadius: "var(--radius-md)", marginBottom: 20, fontSize: ".78rem", color: "var(--text-tertiary)", display: "flex", gap: 16 }}>
                <span>🚫 Thuế khoán: <strong style={{ color: "var(--green)" }}>Đã bỏ</strong></span>
                <span>🚫 Lệ phí môn bài: <strong style={{ color: "var(--green)" }}>Đã bỏ</strong></span>
                <span style={{ marginLeft: "auto", fontStyle: "italic" }}>Hiệu lực 01/01/2026</span>
            </div>

            {/* ──── VAT BY GROUP (§D) ──── */}
            {!tax.isUnderGate && (
                <div className="card card-glow fade-up" style={{ marginBottom: 20, animationDelay: ".05s" }}>
                    <div className="card-header"><span className="card-title">Thuế GTGT theo nhóm ngành</span><span style={{ background: "var(--accent-light)", color: "var(--accent)", padding: "4px 10px", borderRadius: "var(--radius-full)", fontSize: ".72rem", fontWeight: 600 }}>TT69/2025</span></div>
                    <div className="card-body">
                        {activeGroups.length === 0 ? <div style={{ color: "var(--text-tertiary)", fontSize: ".85rem" }}>Chưa có giao dịch doanh thu</div> :
                            activeGroups.map(g => (
                                <div key={g.group.id} className="vat-group-row">
                                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}><span style={{ fontSize: "1.2rem" }}>{g.group.icon}</span><div><div style={{ fontWeight: 600, fontSize: ".85rem" }}>{g.group.label}</div><div style={{ fontSize: ".72rem", color: "var(--text-tertiary)" }}>Doanh thu: {fmtVND(g.revenue)}</div></div></div>
                                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}><span className="vat-group-badge">{g.group.rateLabel}</span><span style={{ fontWeight: 700, minWidth: 100, textAlign: "right" }}>{fmtVND(g.vat)}</span></div>
                                </div>
                            ))}
                        <div className="tax-total-row"><span className="tax-total-label">Tổng VAT phải nộp</span><span className="tax-total-value">{fmtVND(tax.totalVat)}</span></div>
                    </div>
                </div>
            )}

            {/* ──── PIT (§E) ──── */}
            {!tax.isUnderGate && (
                <div className="card card-glow fade-up" style={{ marginBottom: 20, animationDelay: ".1s" }}>
                    <div className="card-header">
                        <span className="card-title">Thuế TNCN kinh doanh</span>
                        <span style={{ background: "var(--blue-light)", color: "var(--blue)", padding: "4px 10px", borderRadius: "var(--radius-full)", fontSize: ".72rem", fontWeight: 600 }}>{tax.pitMethod === "PROFIT" ? "Theo lợi nhuận" : "Theo % doanh thu"}</span>
                    </div>
                    <div className="card-body">
                        {tax.pitMethod === "PROFIT" ? (
                            <div>
                                <div className="tax-row"><span className="tax-row-label">Doanh thu</span><span className="tax-row-value">{fmtVND(tax.revenue)}</span></div>
                                <div className="tax-row"><span className="tax-row-label">Chi phí hợp lệ</span><span className="tax-row-value">−{fmtVND(tax.deductible)}</span></div>
                                <div className="tax-row"><span className="tax-row-label">Lợi nhuận chịu thuế</span><span className="tax-row-value" style={{ color: "var(--blue)" }}>{fmtVND(tax.pitDetail.taxableProfit)}</span></div>
                                <div className="tax-row"><span className="tax-row-label">Thuế suất (doanh thu năm {fmtVND(tax.annualRevenue)})</span><span className="tax-row-value">{tax.pitDetail.rateLabel}</span></div>
                                <div className="tax-total-row"><span className="tax-total-label">PIT phải nộp</span><span className="tax-total-value" style={{ color: "var(--blue)" }}>{fmtVND(tax.pit)}</span></div>
                                <div style={{ marginTop: 12, padding: "10px 14px", background: "var(--bg-elevated)", borderRadius: "var(--radius-sm)", fontSize: ".75rem", color: "var(--text-tertiary)" }}>
                                    Bậc thuế: ≤3 tỷ: 15% · 3–50 tỷ: 17% · &gt;50 tỷ: 20% (Luật 109/2025/QH15)
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div className="tax-row"><span className="tax-row-label">Doanh thu kỳ</span><span className="tax-row-value">{fmtVND(tax.revenue)}</span></div>
                                <div className="tax-row"><span className="tax-row-label">Ngưỡng miễn (pro-rata quý)</span><span className="tax-row-value" style={{ color: "var(--green)" }}>−{fmtVND(tax.pitDetail.gateForPeriod)}</span></div>
                                <div className="tax-row"><span className="tax-row-label">Phần doanh thu vượt ngưỡng</span><span className="tax-row-value" style={{ color: "var(--accent)" }}>{fmtVND(tax.pitDetail.excessRevenue)}</span></div>
                                <div className="tax-row"><span className="tax-row-label">Tỷ lệ PIT ({VAT_GROUPS.find(g => g.id === business.default_vat_group)?.label})</span><span className="tax-row-value">{tax.pitDetail.rateLabel}</span></div>
                                <div className="tax-total-row"><span className="tax-total-label">PIT phải nộp</span><span className="tax-total-value" style={{ color: "var(--blue)" }}>{fmtVND(tax.pit)}</span></div>
                                <div style={{ marginTop: 12, padding: "10px 14px", background: "var(--yellow-light)", borderRadius: "var(--radius-sm)", fontSize: ".75rem", color: "var(--yellow)", fontWeight: 500 }}>
                                    💡 Bạn đang dùng cách tính % doanh thu. Chỉ áp dụng cho DT 500M–3 tỷ. Nếu DT &gt; 3 tỷ, nên chuyển sang "theo lợi nhuận".
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* ──── SUMMARY ──── */}
            <div className="card card-glow fade-up" style={{ marginBottom: 20, animationDelay: ".15s" }}>
                <div className="card-header"><span className="card-title">Tổng hợp kỳ kê khai</span></div>
                <div className="card-body">
                    <div className="tax-row"><span className="tax-row-label">Tổng doanh thu</span><span className="tax-row-value" style={{ color: "var(--green)" }}>{fmtVND(tax.revenue)}</span></div>
                    <div className="tax-row"><span className="tax-row-label">Tổng chi phí</span><span className="tax-row-value">{fmtVND(tax.expense)}</span></div>
                    <div className="tax-row" style={{ paddingLeft: 16, fontSize: ".8rem" }}><span className="tax-row-label">Hợp lệ (có HĐ)</span><span className="tax-row-value">{fmtVND(tax.deductible)}</span></div>
                    <div className="tax-row" style={{ paddingLeft: 16, fontSize: ".8rem" }}><span className="tax-row-label">Không hợp lệ</span><span className="tax-row-value" style={{ color: "var(--red)" }}>{fmtVND(tax.nondeductible)}</span></div>
                    <div style={{ height: 1, background: "var(--border-light)", margin: "8px 0" }} />
                    <div className="tax-row"><span className="tax-row-label">Thuế GTGT</span><span className="tax-row-value">{tax.isUnderGate ? "Miễn" : fmtVND(tax.totalVat)}</span></div>
                    <div className="tax-row"><span className="tax-row-label">Thuế TNCN</span><span className="tax-row-value">{tax.isUnderGate ? "Miễn" : fmtVND(tax.pit)}</span></div>
                    <div className="tax-row"><span className="tax-row-label">Lệ phí môn bài</span><span className="tax-row-value" style={{ color: "var(--green)" }}>Đã bỏ</span></div>
                    <div className="tax-total-row"><span className="tax-total-label">TỔNG THUẾ PHẢI NỘP</span><span className="tax-total-value">{tax.isUnderGate ? "0đ" : fmtVND(tax.totalTax)}</span></div>
                </div>
                <div style={{ padding: "0 24px 24px", display: "flex", gap: 12 }}>
                    {!locked ? <button className="btn btn-primary btn-lg" onClick={() => { setLocked(true); addToast({ type: "success", title: `Đã khóa báo cáo ${periodLabel}`, detail: "Snapshot được tạo. Nhấn 🔓 để mở khóa nếu cần sửa." }) }} style={{ flex: 1, justifyContent: "center" }}><Icons.Lock /> Khóa báo cáo {periodLabel}</button>
                        : <><button className="btn btn-secondary btn-lg" onClick={() => { setLocked(false); addToast({ type: "warning", title: "Đã mở khóa báo cáo", detail: "Bạn có thể chỉnh sửa dữ liệu kỳ này." }) }} style={{ justifyContent: "center" }}><Icons.Unlock /> Mở khóa</button>
                            <button className="btn btn-primary btn-lg" style={{ flex: 1, justifyContent: "center", gap: 8 }} onClick={() => {
                                exportS2c(periodTx, business, categories?.expense);
                                addToast({ type: "success", title: "Đã xuất sổ S2c-HKD", detail: "CSV tải về + In sổ đã mở" });
                            }}><Icons.Print /> In sổ tổng hợp</button></>}
                </div>
            </div>

            {/* ──── TAX GROUP GUIDE — Nghị định thuế HKD 2026 ──── */}
            {(() => {
                const grp = getTaxGroup(business, tax.pitMethod);
                const info = TAX_GROUP_INFO[grp];
                const requiredLedgers = LEDGER_REPORTS.filter(r => info.requiredIds.includes(r.id));
                const optionalLedgers = LEDGER_REPORTS.filter(r => !info.requiredIds.includes(r.id) && r.groups.includes(grp));
                const incCount = periodTx.filter(t => t.type === "income").length;
                const expCount = periodTx.filter(t => t.type === "expense").length;
                const getTxCount = (r) => r.id === "s1a" ? incCount : r.id === "s2a" ? incCount : r.id === "s2b" ? incCount : r.id === "s2c" ? (incCount + expCount) : r.id === "s2d" ? (inventory?.length || 0) : periodTx.length;

                return (<>
                    {/* Group classification banner */}
                    <div className="card card-glow fade-up" style={{ marginBottom: 20, animationDelay: ".2s", overflow: "hidden" }}>
                        <div style={{ padding: "20px 24px", background: `linear-gradient(135deg, ${info.bg}, var(--bg-card))`, borderBottom: "1px solid var(--border-light)" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
                                <div style={{ width: 52, height: 52, borderRadius: "var(--radius-md)", background: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.8rem", boxShadow: "var(--shadow-sm)" }}>{info.icon}</div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                                        <span style={{ background: info.color, color: "white", padding: "3px 10px", borderRadius: "var(--radius-full)", fontSize: ".72rem", fontWeight: 700 }}>{info.label}</span>
                                        <span style={{ fontSize: ".72rem", color: "var(--text-tertiary)" }}>TT152/2025/TT-BTC</span>
                                    </div>
                                    <div style={{ fontWeight: 700, fontSize: "1rem", marginTop: 4 }}>{info.title}</div>
                                    <div style={{ fontSize: ".82rem", color: "var(--text-secondary)", marginTop: 2 }}>{info.taxDesc}</div>
                                </div>
                            </div>

                            {/* Tax formula */}
                            <div style={{ padding: "10px 14px", background: "rgba(255,255,255,.7)", borderRadius: "var(--radius-md)", fontSize: ".82rem", fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
                                <span style={{ color: "var(--text-tertiary)" }}>Công thức:</span>
                                {grp === 1 ? (
                                    <span style={{ color: "var(--green)" }}>Thuế = 0đ (miễn thuế GTGT + TNCN)</span>
                                ) : grp === 2 ? (
                                    <span>Thuế = <span style={{ color: "var(--accent)" }}>VAT (% × DT)</span> + <span style={{ color: "var(--blue)" }}>PIT (% × (DT − 500M))</span></span>
                                ) : (
                                    <span>Thuế = <span style={{ color: "var(--accent)" }}>VAT (% × DT)</span> + <span style={{ color: "var(--blue)" }}>PIT (thuế suất × Lợi nhuận)</span></span>
                                )}
                            </div>
                        </div>

                        {/* Required ledgers */}
                        <div className="card-body" style={{ padding: "16px 24px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                                <span style={{ fontWeight: 700, fontSize: ".92rem" }}>Sổ kế toán bắt buộc</span>
                                <span style={{ background: info.bg, color: info.color, padding: "2px 10px", borderRadius: "var(--radius-full)", fontSize: ".72rem", fontWeight: 700 }}>{requiredLedgers.length} sổ</span>
                            </div>

                            <div style={{ fontSize: ".78rem", color: "var(--text-secondary)", marginBottom: 14, padding: "8px 12px", background: "var(--bg-warm)", borderRadius: "var(--radius-sm)", lineHeight: 1.5 }}>
                                {info.ledgerDesc}. Nhấn vào từng sổ để xem chi tiết dữ liệu hoặc xuất CSV/PDF mang đi báo cáo thuế.
                            </div>

                            {requiredLedgers.map((r, i) => {
                                const txCount = getTxCount(r);
                                return (
                                    <div key={r.id} onClick={() => setOpenLedger(r.id)} className="ledger-item" style={{ cursor: "pointer", border: `2px solid ${r.color}33`, borderRadius: "var(--radius-md)", marginBottom: 10, padding: "14px 16px", background: `${r.bgColor}44` }}>
                                        <div style={{ width: 44, height: 44, borderRadius: "var(--radius-sm)", background: r.bgColor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", flexShrink: 0, border: `2px solid ${r.color}44` }}>{r.icon}</div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                                                <span style={{ fontWeight: 700, fontSize: ".9rem", color: r.color }}>{r.code}</span>
                                                <span style={{ color: "var(--text-secondary)", fontWeight: 500, fontSize: ".85rem" }}>{r.title}</span>
                                                <span style={{ background: info.color, color: "white", padding: "1px 8px", borderRadius: "var(--radius-full)", fontSize: ".65rem", fontWeight: 700 }}>Bắt buộc</span>
                                            </div>
                                            <div style={{ fontSize: ".75rem", color: "var(--text-tertiary)", marginTop: 3 }}>{r.desc}</div>
                                            <div style={{ marginTop: 4, fontSize: ".72rem", color: txCount > 0 ? "var(--green)" : "var(--yellow)", fontWeight: 600 }}>
                                                {txCount > 0 ? `✓ ${txCount} ${r.id === "s2d" ? "hàng hóa" : "giao dịch"} sẵn sàng` : "⚠ Chưa có dữ liệu — cần bổ sung"}
                                            </div>
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0 }}>
                                            <span style={{ fontSize: ".82rem", color: "var(--accent)", fontWeight: 600 }}>Xem sổ →</span>
                                        </div>
                                    </div>
                                )
                            })}

                            {/* Quick action: Download all required */}
                            <div style={{ marginTop: 8, display: "flex", gap: 10 }}>
                                <button className="btn btn-primary btn-lg" style={{ flex: 1, justifyContent: "center", gap: 8 }} onClick={() => {
                                    requiredLedgers.forEach(r => {
                                        const exportMap = { s1a: () => exportS1a(periodTx, business), s2a: () => exportS2b(periodTx, business), s2b: () => exportS2b(periodTx, business), s2c: () => exportS2c(periodTx, business, categories?.expense), s2d: () => exportS2d(inventory, business), s2e: () => exportS2e(periodTx, business) };
                                        if (exportMap[r.id]) exportMap[r.id]();
                                    });
                                    addToast({ type: "success", title: `Đã xuất ${requiredLedgers.length} sổ bắt buộc`, detail: `${requiredLedgers.map(r => r.code).join(" + ")} — CSV + In sổ` });
                                }}>
                                    <Icons.Print /> In tất cả {requiredLedgers.length} sổ bắt buộc
                                </button>
                            </div>
                        </div>

                        {/* Notes for this group */}
                        <div style={{ padding: "0 24px 20px" }}>
                            <div style={{ fontSize: ".75rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: 8 }}>Lưu ý cho {info.label}:</div>
                            <div style={{ borderRadius: "var(--radius-md)", border: "1px solid var(--border-light)", overflow: "hidden" }}>
                                {info.notes.map((note, i) => (
                                    <div key={i} style={{ display: "flex", gap: 10, padding: "8px 14px", borderBottom: i < info.notes.length - 1 ? "1px solid var(--border-light)" : "none", background: i % 2 === 0 ? "var(--bg-card)" : "var(--bg-elevated)", fontSize: ".78rem", color: "var(--text-secondary)", alignItems: "flex-start" }}>
                                        <span style={{ color: info.color, fontWeight: 700, flexShrink: 0 }}>({i + 1})</span>
                                        <span>{note}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ──── ALL 3 GROUP COMPARISON ──── */}
                    <div className="card card-glow fade-up" style={{ animationDelay: ".25s" }}>
                        <div className="card-header"><span className="card-title">So sánh 3 nhóm HKD — Nghị định thuế 2026</span><span style={{ fontSize: ".72rem", color: "var(--text-tertiary)" }}>Bạn đang ở {info.label}</span></div>
                        <div className="card-body" style={{ padding: "12px 24px" }}>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                                {[1, 2, 3].map(g => {
                                    const gi = TAX_GROUP_INFO[g];
                                    const isActive = g === grp;
                                    return (
                                        <div key={g} style={{ padding: "14px 16px", borderRadius: "var(--radius-md)", border: `2px solid ${isActive ? gi.color : "var(--border-light)"}`, background: isActive ? gi.bg : "var(--bg-card)", opacity: isActive ? 1 : 0.7, transition: "all .2s" }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                                                <span style={{ fontSize: "1.2rem" }}>{gi.icon}</span>
                                                <span style={{ fontWeight: 700, fontSize: ".82rem", color: gi.color }}>{gi.label}</span>
                                                {isActive && <span style={{ background: gi.color, color: "white", padding: "1px 6px", borderRadius: "var(--radius-full)", fontSize: ".6rem", fontWeight: 700 }}>BẠN</span>}
                                            </div>
                                            <div style={{ fontSize: ".72rem", color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: 8 }}>
                                                {g === 1 ? "DT ≤ 500M/năm" : g === 2 ? "DT > 500M · PIT theo % DT" : "DT > 500M · PIT theo lợi nhuận"}
                                            </div>
                                            <div style={{ fontSize: ".72rem", fontWeight: 600, color: gi.color }}>
                                                {gi.requiredIds.length} sổ: {gi.requiredIds.map(id => LEDGER_REPORTS.find(r => r.id === id)?.code).join(", ")}
                                            </div>
                                            <div style={{ fontSize: ".68rem", color: g === 1 ? "var(--green)" : "var(--text-tertiary)", marginTop: 4, fontWeight: 500 }}>
                                                {g === 1 ? "Miễn thuế" : g === 2 ? "VAT + PIT (đơn giản)" : "VAT + PIT (chi tiết)"}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Disclaimer */}
                            <div style={{ marginTop: 14, padding: "10px 14px", background: "var(--bg-warm)", borderRadius: "var(--radius-sm)", fontSize: ".72rem", color: "var(--text-tertiary)", lineHeight: 1.5 }}>
                                ⚖️ Nghị định quy định về quản lý thuế hộ kinh doanh đang chờ ban hành chính thức (dự thảo lần 2). Nội dung trên dựa theo dự thảo Nghị định + Thông tư 152/2025/TT-BTC + Luật 109/2025/QH15. Hộ kinh doanh có thể thay đổi phương pháp tính PIT (nhóm 2 ↔ nhóm 3) trong Cài đặt thuế.
                            </div>
                        </div>
                    </div>
                </>);
            })()}
        </div>

        {/* Ledger Detail Modal */}
        {openLedger && <LedgerDetailModal ledgerId={openLedger} onClose={() => setOpenLedger(null)} transactions={periodTx} business={business} inventory={inventory} addToast={addToast} categories={categories} />}
    </>);
}

// ═══════════════════════════════════════════════════════════════════════════════
// RISK AUDIT
// ═══════════════════════════════════════════════════════════════════════════════
function RiskAudit({ transactions, onNavigate, addToast, business }) {
    const flags = getRiskFlags(transactions); const riskScore = Math.min(100, flags.reduce((s, f) => s + (f.severity === "error" ? 25 : 12) * Math.min(f.count, 3), 0));
    const riskLevel = riskScore <= 20 ? "Thấp" : riskScore <= 50 ? "Trung bình" : riskScore <= 75 ? "Cao" : "Nghiêm trọng";
    const riskColor = riskScore <= 20 ? "var(--green)" : riskScore <= 50 ? "var(--yellow)" : "var(--red)";
    const totalTx = transactions.length; const withInv = transactions.filter(t => t.type === "expense" && t.has_invoice).length; const totalExp = transactions.filter(t => t.type === "expense").length; const invPct = totalExp > 0 ? ((withInv / totalExp) * 100).toFixed(0) : 100;
    const reconciledCount = transactions.filter(t => t.payment_method === "bank_transfer" && t.reconciled).length;
    const bankTxCount = transactions.filter(t => t.payment_method === "bank_transfer").length;
    const reconPct = bankTxCount > 0 ? Math.round((reconciledCount / bankTxCount) * 100) : 100;
    const circ = 2 * Math.PI * 40; const dash = (riskScore / 100) * circ;

    // ── Click risk flag → navigate to transactions with filter ──
    const handleFlagClick = (f) => {
        if (!onNavigate) return;
        // Map risk code to transaction filter
        const filterMap = {
            missing_invoices: { type: "expense", filterFn: t => t.type === "expense" && !t.has_invoice && t.amount >= 200000, label: "Chi phí thiếu hóa đơn" },
            large_cash: { type: "all", filterFn: t => t.payment_method === "cash" && t.amount > 20000000, label: "Tiền mặt > 20 triệu" },
            high_no_invoice_ratio: { type: "expense", filterFn: t => t.type === "expense" && !t.has_invoice && t.amount >= 200000, label: "Chi phí không HĐ" },
            unreconciled: { type: "all", filterFn: t => !t.reconciled && t.payment_method === "bank_transfer", label: "Chưa đối soát NH" },
        };
        const filter = filterMap[f.code];
        if (filter) {
            onNavigate("transactions", { riskFilter: filter });
        }
    };

    // ── Export Audit Pack (Excel) ──
    const [exporting, setExporting] = useState(false);
    const exportAuditPack = () => {
        setExporting(true);
        try {
            const wb = XLSX.utils.book_new();
            const today = new Date().toISOString().split("T")[0];

            // Sheet 1: Risk Summary
            const summaryData = [
                { "Mục": "Điểm rủi ro", "Giá trị": `${riskScore}/100`, "Đánh giá": riskLevel },
                { "Mục": "Tổng giao dịch", "Giá trị": totalTx, "Đánh giá": "" },
                { "Mục": "Tỷ lệ có hóa đơn", "Giá trị": `${invPct}%`, "Đánh giá": `${withInv}/${totalExp} chi phí` },
                { "Mục": "Đối soát ngân hàng", "Giá trị": `${reconPct}%`, "Đánh giá": `${reconciledCount}/${bankTxCount} GD ngân hàng` },
                { "Mục": "Số cảnh báo", "Giá trị": flags.length, "Đánh giá": flags.length === 0 ? "Ổn định" : "Cần xem xét" },
                { "Mục": "", "Giá trị": "", "Đánh giá": "" },
                { "Mục": "Ngày xuất", "Giá trị": today, "Đánh giá": "HKD Tax Audit Pack" },
                { "Mục": "Hộ kinh doanh", "Giá trị": business?.name || "", "Đánh giá": business?.tax_id || "" },
            ];
            const ws1 = XLSX.utils.json_to_sheet(summaryData);
            ws1["!cols"] = [{ wch: 22 }, { wch: 18 }, { wch: 30 }];
            XLSX.utils.book_append_sheet(wb, ws1, "Tổng quan rủi ro");

            // Sheet 2: Risk Flags Detail
            if (flags.length > 0) {
                const flagData = flags.map(f => ({ "Mức độ": f.severity === "error" ? "🔴 Nghiêm trọng" : "🟡 Cảnh báo", "Tiêu đề": f.title, "Chi tiết": f.detail, "Số GD": f.count, "Số tiền": f.amount }));
                const ws2 = XLSX.utils.json_to_sheet(flagData);
                ws2["!cols"] = [{ wch: 18 }, { wch: 22 }, { wch: 40 }, { wch: 8 }, { wch: 16 }];
                XLSX.utils.book_append_sheet(wb, ws2, "Cảnh báo chi tiết");
            }

            // Sheet 3: Missing Invoices
            const noInvTx = transactions.filter(t => t.type === "expense" && !t.has_invoice && t.amount >= 200000);
            if (noInvTx.length > 0) {
                const noInvData = noInvTx.map((t, i) => ({ "STT": i + 1, "Ngày": t.tx_date, "Mô tả": t.description, "Đối tác": t.counterparty || "", "Số tiền": t.amount, "Thanh toán": t.payment_method === "cash" ? "Tiền mặt" : "CK" }));
                const ws3 = XLSX.utils.json_to_sheet(noInvData);
                ws3["!cols"] = [{ wch: 5 }, { wch: 12 }, { wch: 30 }, { wch: 20 }, { wch: 16 }, { wch: 12 }];
                XLSX.utils.book_append_sheet(wb, ws3, "Thiếu hóa đơn");
            }

            // Sheet 4: Large Cash
            const largeCash = transactions.filter(t => t.payment_method === "cash" && t.amount > 20000000);
            if (largeCash.length > 0) {
                const cashData = largeCash.map((t, i) => ({ "STT": i + 1, "Ngày": t.tx_date, "Loại": t.type === "income" ? "Thu" : "Chi", "Mô tả": t.description, "Số tiền": t.amount, "Đối tác": t.counterparty || "" }));
                const ws4 = XLSX.utils.json_to_sheet(cashData);
                ws4["!cols"] = [{ wch: 5 }, { wch: 12 }, { wch: 6 }, { wch: 30 }, { wch: 16 }, { wch: 20 }];
                XLSX.utils.book_append_sheet(wb, ws4, "Tiền mặt lớn");
            }

            // Sheet 5: Unreconciled Bank
            const unrecTx = transactions.filter(t => !t.reconciled && t.payment_method === "bank_transfer");
            if (unrecTx.length > 0) {
                const unrecData = unrecTx.map((t, i) => ({ "STT": i + 1, "Ngày": t.tx_date, "Loại": t.type === "income" ? "Thu" : "Chi", "Mô tả": t.description, "Số tiền": t.amount, "Đối tác": t.counterparty || "" }));
                const ws5 = XLSX.utils.json_to_sheet(unrecData);
                ws5["!cols"] = [{ wch: 5 }, { wch: 12 }, { wch: 6 }, { wch: 30 }, { wch: 16 }, { wch: 20 }];
                XLSX.utils.book_append_sheet(wb, ws5, "Chưa đối soát");
            }

            // Sheet 6: All Transactions (condensed)
            const allData = transactions.map((t, i) => ({ "STT": i + 1, "Ngày": t.tx_date, "Loại": t.type === "income" ? "Thu" : "Chi", "Mô tả": t.description, "Danh mục": t.category_name, "Số tiền": t.amount, "HĐ": t.has_invoice ? "Có" : "Không", "Thanh toán": t.payment_method === "cash" ? "TM" : "CK", "Đối soát": t.reconciled ? "✓" : "—", "Đối tác": t.counterparty || "" }));
            const ws6 = XLSX.utils.json_to_sheet(allData);
            ws6["!cols"] = [{ wch: 5 }, { wch: 12 }, { wch: 6 }, { wch: 30 }, { wch: 14 }, { wch: 16 }, { wch: 6 }, { wch: 8 }, { wch: 8 }, { wch: 20 }];
            XLSX.utils.book_append_sheet(wb, ws6, "Tất cả giao dịch");

            const fileName = `AuditPack_${business?.tax_id || "HKD"}_${today}.xlsx`;
            // XLSX.writeFile doesn't work in sandboxed iframe — use manual blob download
            const wbOut = XLSX.write(wb, { bookType: "xlsx", type: "array" });
            const blob = new Blob([wbOut], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url; a.download = fileName;
            document.body.appendChild(a); a.click();
            setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url); }, 100);
            addToast({ type: "success", title: "Xuất Audit Pack thành công!", detail: `${fileName} — ${flags.length} cảnh báo, ${totalTx} giao dịch` });
        } catch (err) {
            console.error(err);
            addToast({ type: "warning", title: "Lỗi xuất Audit Pack", detail: err.message || "Vui lòng thử lại" });
        }
        setExporting(false);
    };

    return (<><div className="page-header"><div><h1 className="page-title">Kiểm tra rủi ro</h1><p className="page-subtitle">Đánh giá mức độ sẵn sàng nếu "bị gọi lên thuế"</p></div><button className="btn btn-primary" onClick={exportAuditPack} disabled={exporting}>{exporting ? <><div style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,.3)", borderTopColor: "white", borderRadius: "50%", animation: "spin .6s linear infinite" }} /> Đang xuất...</> : <><Icons.Download /> Tạo Audit Pack</>}</button></div>
        <div className="page-body"><div className="risk-top-grid" style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 20, marginBottom: 24 }}>
            <div className="card card-glow fade-up" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 28 }}><div className="risk-score-ring"><svg width="100" height="100" style={{ transform: "rotate(-90deg)" }}><circle cx="50" cy="50" r="40" fill="none" stroke="var(--border)" strokeWidth="8" /><circle cx="50" cy="50" r="40" fill="none" stroke={riskColor} strokeWidth="8" strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={circ - dash} style={{ transition: "stroke-dashoffset 1s ease-out" }} /></svg><span className="risk-score-value" style={{ color: riskColor }}>{riskScore}</span></div><div style={{ marginTop: 12, fontWeight: 700, color: riskColor }}>{riskLevel}</div><div style={{ fontSize: ".75rem", color: "var(--text-tertiary)", marginTop: 4 }}>Điểm rủi ro / 100</div></div>
            <div className="risk-stats-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}><div className="stat-card green fade-up"><div className="stat-label">Giao dịch</div><div className="stat-value">{totalTx}</div><div className="stat-sub">tổng trong kỳ</div></div><div className="stat-card blue fade-up"><div className="stat-label">Hóa đơn</div><div className="stat-value blue">{invPct}%</div><div className="stat-sub">{withInv}/{totalExp} chi phí có HĐ</div></div><div className="stat-card yellow fade-up"><div className="stat-label">Cảnh báo</div><div className="stat-value" style={{ color: "var(--yellow)" }}>{flags.length}</div><div className="stat-sub">vấn đề cần xem</div></div><div className="stat-card accent fade-up"><div className="stat-label">Đối soát NH</div><div className="stat-value accent">{reconPct}%</div><div className="stat-sub">{reconciledCount}/{bankTxCount} GD ngân hàng</div></div></div>
        </div>
            <div className="card card-glow fade-up" style={{ animationDelay: ".15s" }}><div className="card-header"><span className="card-title">Chi tiết cảnh báo</span><span style={{ fontSize: ".72rem", color: "var(--text-tertiary)" }}>Nhấn để xem giao dịch liên quan</span></div><div className="card-body">{flags.length === 0 ? <div className="empty-state"><div className="empty-icon">🛡️</div><div className="empty-text">Không có cảnh báo — hồ sơ tốt!</div></div> : flags.map((f, i) => (<div key={i} className={`risk-flag ${f.severity}`} style={{ cursor: "pointer", transition: "all .15s" }} onClick={() => handleFlagClick(f)} onMouseOver={e => e.currentTarget.style.transform = "translateX(4px)"} onMouseOut={e => e.currentTarget.style.transform = "none"}><span className="risk-flag-icon">{f.severity === "error" ? "🔴" : "🟡"}</span><div style={{ flex: 1 }}><div className="risk-flag-title">{f.title}</div><div className="risk-flag-detail">{f.detail}</div></div><div style={{ textAlign: "right", flexShrink: 0 }}><div style={{ fontWeight: 700, fontSize: ".9rem" }}>{fmtVND(f.amount)}</div><div style={{ fontSize: ".7rem", color: "var(--text-tertiary)" }}>{f.count} GD</div></div><span style={{ color: "var(--accent)", fontSize: ".82rem", fontWeight: 600, flexShrink: 0 }}>→</span></div>))}</div></div>
            <div className="card card-glow fade-up" style={{ marginTop: 20, animationDelay: ".25s" }}><div className="card-header"><span className="card-title">Đề xuất hành động</span></div><div className="card-body" style={{ padding: "12px 24px" }}>{[{ p: 1, a: "Bổ sung hóa đơn cho các khoản chi lớn chưa có HĐ", r: "Giảm tỷ lệ chi phí không hợp lệ", nav: "transactions" }, { p: 2, a: "Import sao kê ngân hàng (CSV) để đối soát", r: "Tăng độ tin cậy hồ sơ", nav: "reconcile" }, { p: 3, a: "Ghi nhận tên đối tác cho giao dịch > 5 triệu", r: "Thuận tiện khi kiểm tra thuế", nav: "transactions" }].map((item, i) => (<div key={i} style={{ display: "flex", gap: 14, padding: "14px 0", borderBottom: i < 2 ? "1px solid var(--border-light)" : "none", alignItems: "flex-start", cursor: "pointer" }} onClick={() => onNavigate && onNavigate(item.nav)}><span style={{ background: "var(--accent)", color: "white", width: 24, height: 24, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".7rem", fontWeight: 700, flexShrink: 0 }}>{item.p}</span><div style={{ flex: 1 }}><div style={{ fontWeight: 600, fontSize: ".88rem" }}>{item.a}</div><div style={{ fontSize: ".75rem", color: "var(--text-tertiary)", marginTop: 2 }}>{item.r}</div></div><span style={{ color: "var(--accent)", fontSize: ".82rem", fontWeight: 600, flexShrink: 0 }}>→</span></div>))}</div></div>
        </div></>);
}

// ═══════════════════════════════════════════════════════════════════════════════
// ONBOARDING — 4 steps: Business info → Revenue tier → VAT group → PIT method
// ═══════════════════════════════════════════════════════════════════════════════
function Onboarding({ onComplete }) {
    const [step, setStep] = useState(0);
    const [d, setD] = useState({ name: "", tax_id: "", address: "", revenue_tier: "", default_vat_group: "", pit_method: "", track_inventory: false, track_cash: true });

    const canGo = step === 0 ? d.name.trim() : step === 1 ? d.revenue_tier : step === 2 ? d.default_vat_group : step === 3 ? (d.revenue_tier === "under_500m" || d.pit_method) : true;
    const showPit = d.revenue_tier === "500m_3b" || d.revenue_tier === "over_3b";
    const canRevPct = d.revenue_tier === "500m_3b";

    const steps = [
        {
            title: "Tạo hộ kinh doanh", subtitle: "Thông tin cơ bản — có thể thay đổi sau", content: (
                <div>
                    <div className="field"><label className="field-label">Tên hộ kinh doanh / cửa hàng</label><input className="field-input" placeholder="VD: Quán Phở Hương Lan" value={d.name} onChange={e => setD({ ...d, name: e.target.value })} autoFocus style={{ fontSize: "1.05rem", padding: "14px 18px" }} /></div>
                    <div className="field-row"><div className="field"><label className="field-label">Mã số thuế</label><input className="field-input" placeholder="0123456789" value={d.tax_id} onChange={e => setD({ ...d, tax_id: e.target.value })} style={{ fontFamily: "var(--font-mono)" }} /><div className="field-hint">Không bắt buộc</div></div><div className="field"><label className="field-label">Địa chỉ</label><input className="field-input" placeholder="Số nhà, đường, quận..." value={d.address} onChange={e => setD({ ...d, address: e.target.value })} /></div></div>
                </div>
            )
        },
        {
            title: "Doanh thu ước tính/năm?", subtitle: "Quyết định ngưỡng thuế và loại sổ cần dùng", content: (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {[
                        { id: "under_500m", label: "Dưới 500 triệu/năm", desc: "Không chịu VAT, không nộp PIT", tag: "Miễn thuế", tagColor: "var(--green)", tagBg: "var(--green-light)" },
                        { id: "500m_3b", label: "500 triệu — 3 tỷ/năm", desc: "Kê khai VAT + PIT (chọn cách tính PIT)", tag: "Sổ S2b–S2e", tagColor: "var(--accent)", tagBg: "var(--accent-light)" },
                        { id: "over_3b", label: "Trên 3 tỷ/năm", desc: "Kê khai chi tiết — PIT theo lợi nhuận", tag: "Đầy đủ", tagColor: "var(--blue)", tagBg: "var(--blue-light)" },
                    ].map(o => (<div key={o.id} onClick={() => setD({ ...d, revenue_tier: o.id, pit_method: o.id === "under_500m" ? "" : o.id === "over_3b" ? "PROFIT" : "" })} style={{ display: "flex", gap: 14, padding: "16px 18px", borderRadius: "var(--radius-md)", border: `2px solid ${d.revenue_tier === o.id ? "var(--accent)" : "var(--border)"}`, background: d.revenue_tier === o.id ? "var(--accent-light)" : "var(--bg-card)", cursor: "pointer", transition: "all .15s", alignItems: "center" }}>
                        <div style={{ flex: 1 }}><div style={{ fontWeight: 600, fontSize: ".92rem" }}>{o.label}</div><div style={{ fontSize: ".78rem", color: "var(--text-tertiary)", marginTop: 2 }}>{o.desc}</div></div>
                        <span style={{ background: o.tagBg, color: o.tagColor, padding: "3px 10px", borderRadius: "var(--radius-full)", fontSize: ".68rem", fontWeight: 700, flexShrink: 0 }}>{o.tag}</span>
                    </div>))}
                    <div style={{ padding: "10px 14px", background: "var(--yellow-light)", borderRadius: "var(--radius-sm)", fontSize: ".75rem", color: "var(--yellow)", fontWeight: 500 }}>
                        ⚠ Ngưỡng 500 triệu/năm (Luật 109/2025/QH15): vượt qua = phải kê khai VAT + PIT
                    </div>
                </div>
            )
        },
        {
            title: "Nhóm ngành VAT?", subtitle: "Theo TT69/2025 — tỷ lệ VAT trên doanh thu", content: (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    {VAT_GROUPS.map(g => (<div key={g.id} onClick={() => setD({ ...d, default_vat_group: g.id })} style={{ padding: "18px 16px", borderRadius: "var(--radius-md)", textAlign: "center", border: `2px solid ${d.default_vat_group === g.id ? "var(--accent)" : "var(--border)"}`, background: d.default_vat_group === g.id ? "var(--accent-light)" : "var(--bg-card)", cursor: "pointer", transition: "all .15s" }}>
                        <div style={{ fontSize: "1.8rem", marginBottom: 6 }}>{g.icon}</div>
                        <div style={{ fontWeight: 600, fontSize: ".85rem" }}>{g.label}</div>
                        <div style={{ fontSize: ".75rem", color: "var(--text-tertiary)", marginTop: 4, fontFamily: "var(--font-mono)", fontWeight: 700 }}>VAT {g.rateLabel} · PIT {(g.pitRevPct * 100)}%</div>
                    </div>))}
                </div>
            )
        },
        {
            title: showPit ? "Cách tính thuế TNCN?" : "Cấu hình thêm", subtitle: showPit ? "Luật 109/2025/QH15 cho phép 2 cách tính" : "Tuỳ chọn theo dõi nâng cao", content: (
                <div>
                    {showPit && (<>
                        <div className={`pit-method-card ${d.pit_method === "PROFIT" ? "active" : ""}`} onClick={() => setD({ ...d, pit_method: "PROFIT" })}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontWeight: 700, fontSize: ".92rem" }}>Theo lợi nhuận</span><span style={{ fontFamily: "var(--font-mono)", fontSize: ".72rem", color: "var(--blue)" }}>15–20%</span></div>
                            <div style={{ fontSize: ".78rem", color: "var(--text-secondary)", marginTop: 4 }}>PIT = (Doanh thu − Chi phí) × thuế suất theo bậc. Phù hợp nếu chi phí lớn, biên lợi nhuận thấp.</div>
                        </div>
                        <div className={`pit-method-card ${d.pit_method === "REVENUE_PERCENT" ? "active" : ""} ${!canRevPct ? "ledger-disabled" : ""}`} onClick={() => canRevPct && setD({ ...d, pit_method: "REVENUE_PERCENT" })}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontWeight: 700, fontSize: ".92rem" }}>Theo % doanh thu</span><span style={{ fontFamily: "var(--font-mono)", fontSize: ".72rem", color: "var(--accent)" }}>0.5–5%</span></div>
                            <div style={{ fontSize: ".78rem", color: "var(--text-secondary)", marginTop: 4 }}>PIT = % trên phần doanh thu vượt 500M. Chỉ áp dụng cho DT 500M–3 tỷ.</div>
                            {!canRevPct && <div style={{ fontSize: ".72rem", color: "var(--red)", marginTop: 4 }}>Không khả dụng — doanh thu của bạn &gt; 3 tỷ</div>}
                        </div>
                    </>)}
                    <div style={{ marginTop: showPit ? 20 : 0 }}>
                        <div className="field-toggle-row" style={{ background: "var(--bg-elevated)", padding: "14px 18px", borderRadius: "var(--radius-md)", marginBottom: 10 }}>
                            <div><div style={{ fontWeight: 600, fontSize: ".88rem" }}>Theo dõi tồn kho (S2d)</div><div style={{ fontSize: ".72rem", color: "var(--text-tertiary)", marginTop: 2 }}>Bật nếu bạn cần quản lý nhập/xuất kho</div></div>
                            <button className={`toggle ${d.track_inventory ? "on" : ""}`} onClick={() => setD({ ...d, track_inventory: !d.track_inventory })} />
                        </div>
                        <div className="field-toggle-row" style={{ background: "var(--bg-elevated)", padding: "14px 18px", borderRadius: "var(--radius-md)" }}>
                            <div><div style={{ fontWeight: 600, fontSize: ".88rem" }}>Theo dõi dòng tiền (S2e)</div><div style={{ fontSize: ".72rem", color: "var(--text-tertiary)", marginTop: 2 }}>Sổ quỹ tiền mặt + ngân hàng</div></div>
                            <button className={`toggle ${d.track_cash ? "on" : ""}`} onClick={() => setD({ ...d, track_cash: !d.track_cash })} />
                        </div>
                    </div>
                </div>
            )
        },
    ];

    const getResult = () => {
        if (d.revenue_tier === "under_500m") return { label: "Miễn thuế — Chỉ cần Sổ S1a", color: "var(--green)" };
        if (d.revenue_tier === "500m_3b") return { label: `Sổ S2b–S2e · PIT ${d.pit_method === "PROFIT" ? "theo lợi nhuận" : "theo % doanh thu"}`, color: "var(--accent)" };
        return { label: "Đầy đủ S2b–S2e · PIT theo lợi nhuận", color: "var(--blue)" };
    };

    return (<div className="onboarding-shell"><div className="onboarding-card fade-up">
        <div className="onboarding-header"><div className="onboarding-step-indicator">{steps.map((_, i) => (<div key={i} className={`onboarding-dot ${i === step ? "active" : i < step ? "done" : ""}`} />))}</div><h1 className="onboarding-title">{steps[step].title}</h1><p className="onboarding-subtitle">{steps[step].subtitle}</p></div>
        <div className="onboarding-body">{steps[step].content}</div>
        <div className="onboarding-footer">{step > 0 ? <button className="btn btn-ghost" onClick={() => setStep(step - 1)}>← Quay lại</button> : <div />}<button className="btn btn-primary btn-lg" disabled={!canGo} onClick={() => step < steps.length - 1 ? setStep(step + 1) : onComplete({ ...d, annual_revenue_estimate: d.revenue_tier === "under_500m" ? 400000000 : d.revenue_tier === "500m_3b" ? 600000000 : 4000000000 })}>{step < steps.length - 1 ? <>Tiếp tục <Icons.ArrowRight /></> : <>Bắt đầu ngay <Icons.ArrowRight /></>}</button></div>
        {step === 3 && d.revenue_tier && <div style={{ margin: "0 36px 24px", padding: "14px 18px", background: "var(--green-light)", borderRadius: "var(--radius-md)", fontSize: ".85rem", color: getResult().color, fontWeight: 500, animation: "fadeUp .3s ease-out" }}>✓ {getResult().label}. HKD Tax sẽ tự bật sổ sách phù hợp.</div>}
    </div></div>);
}

// ═══════════════════════════════════════════════════════════════════════════════
// RECONCILE PAGE
// ═══════════════════════════════════════════════════════════════════════════════
function ReconcilePage({ transactions, setTransactions, bankEntries: initBank, addToast, wallets, categories, business }) {
    const [bankData, setBankData] = useState(initBank);
    const [matches, setMatches] = useState({}); // bankId -> txId
    const [selBank, setSelBank] = useState(null); // selected bank entry id
    const [showImport, setShowImport] = useState(false);
    const [csvText, setCsvText] = useState("");
    const [filter, setFilter] = useState("unmatched"); // all|matched|unmatched
    const [showCreate, setShowCreate] = useState(null); // bank entry → create tx modal
    const [createForm, setCreateForm] = useState(null); // full form state for create
    const [searchBank, setSearchBank] = useState("");
    const [searchTx, setSearchTx] = useState("");
    const [sortBank, setSortBank] = useState("date_desc"); // date_desc|date_asc|amt_desc|amt_asc
    const [showGuide, setShowGuide] = useState(false);
    const fileRef = useRef(null);

    // ─── Derived (memoized) ────
    const allBankTx = useMemo(() => transactions.filter(t => t.payment_method === "bank_transfer" || t.payment_method === "bank"), [transactions]);
    const matchedTxIds = useMemo(() => new Set(Object.values(matches)), [matches]);
    const matchedCount = Object.keys(matches).length;
    const unmatchedBank = useMemo(() => bankData.filter(bk => !matches[bk.id]), [bankData, matches]);
    const unmatchedTx = useMemo(() => allBankTx.filter(t => !matchedTxIds.has(t.id) && !t.reconciled), [allBankTx, matchedTxIds]);

    // Balance summary
    const bankTotal = useMemo(() => bankData.reduce((s, b) => s + b.amount, 0), [bankData]);
    const bookBankIn = useMemo(() => allBankTx.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0), [allBankTx]);
    const bookBankOut = useMemo(() => allBankTx.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0), [allBankTx]);
    const bookNet = bookBankIn - bookBankOut;
    const diff = bankTotal - bookNet;

    // ─── Scoring function (memoized) ────
    const scoreMatch = useCallback((bk, tx) => {
        let score = 0;
        const bkAmt = Math.abs(bk.amount);
        // Amount (max 50)
        if (tx.amount === bkAmt) score += 50;
        else if (bkAmt > 0 && Math.abs(tx.amount - bkAmt) / bkAmt < 0.005) score += 40;
        else if (bkAmt > 0 && Math.abs(tx.amount - bkAmt) / bkAmt < 0.02) score += 25;
        else if (bkAmt > 0 && Math.abs(tx.amount - bkAmt) / bkAmt < 0.05) score += 10;
        else return 0; // amount too different
        // Direction (max 15)
        if ((tx.type === "income" && bk.amount > 0) || (tx.type === "expense" && bk.amount < 0)) score += 15;
        else score -= 10;
        // Date (max 25)
        const dayDiff = Math.abs((new Date(tx.tx_date) - new Date(bk.date)) / (86400000));
        if (dayDiff === 0) score += 25;
        else if (dayDiff <= 1) score += 20;
        else if (dayDiff <= 3) score += 14;
        else if (dayDiff <= 7) score += 6;
        else if (dayDiff <= 14) score += 2;
        // Text similarity (max 10)
        const normalize = s => (s || "").toLowerCase().replace(/[^a-z0-9àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/g, " ").split(/\s+/).filter(w => w.length > 2);
        const bkW = normalize(bk.description);
        const txW = normalize(tx.description + " " + tx.counterparty);
        const common = bkW.filter(w => txW.some(tw => tw.includes(w) || w.includes(tw))).length;
        score += Math.min(common * 4, 10);
        return score;
    }, []);

    // ─── Suggestions for selected bank entry ────
    const suggestions = useMemo(() => {
        if (!selBank) return [];
        const bk = bankData.find(b => b.id === selBank);
        if (!bk) return [];
        return unmatchedTx
            .map(tx => ({ tx, score: scoreMatch(bk, tx) }))
            .filter(s => s.score > 10)
            .sort((a, b) => b.score - a.score)
            .slice(0, 8);
    }, [selBank, bankData, unmatchedTx, scoreMatch]);

    // ─── Auto-match (greedy best-first) ────
    const autoMatch = () => {
        const newMatches = { ...matches };
        const usedTx = new Set(Object.values(newMatches));
        // Build all possible pairs with scores
        const pairs = [];
        bankData.forEach(bk => {
            if (newMatches[bk.id]) return;
            unmatchedTx.forEach(tx => {
                if (usedTx.has(tx.id)) return;
                const score = scoreMatch(bk, tx);
                if (score >= 55) pairs.push({ bkId: bk.id, txId: tx.id, score });
            });
        });
        // Sort by score desc, greedily assign
        pairs.sort((a, b) => b.score - a.score);
        let count = 0;
        const usedBk = new Set(Object.keys(newMatches));
        pairs.forEach(p => {
            if (usedBk.has(p.bkId) || usedTx.has(p.txId)) return;
            newMatches[p.bkId] = p.txId;
            usedBk.add(p.bkId); usedTx.add(p.txId);
            count++;
        });
        setMatches(newMatches);
        if (count > 0) addToast({ type: "success", title: `Tự động ghép ${count} cặp`, detail: `Tổng: ${Object.keys(newMatches).length}/${bankData.length} đã khớp` });
        else addToast({ type: "info", title: "Không tìm thấy cặp mới", detail: "Hãy chọn thủ công hoặc tạo GD mới" });
    };

    // ─── Match / Unmatch ────
    const doMatch = (bkId, txId) => {
        setMatches(p => ({ ...p, [bkId]: txId }));
        const bk = bankData.find(b => b.id === bkId);
        addToast({ type: "success", title: "Đã ghép", detail: `${bk?.description || ""} ↔ ${transactions.find(t => t.id === txId)?.description || ""}` });
        setSelBank(null);
    };
    const unmatch = (bkId) => setMatches(p => { const n = { ...p }; delete n[bkId]; return n; });

    // ─── Confirm ────
    const confirmAll = () => {
        const txIds = new Set(Object.values(matches));
        setTransactions(prev => prev.map(t => txIds.has(t.id) ? { ...t, reconciled: true } : t));
        const confirmedBkIds = new Set(Object.keys(matches));
        setBankData(prev => prev.map(b => confirmedBkIds.has(b.id) ? { ...b, matched: true } : b));
        addToast({ type: "success", title: `Xác nhận ${txIds.size} cặp đối soát`, detail: "Trạng thái reconciled đã cập nhật" });
        setMatches({});
    };

    // ─── CSV Parser (Vietnamese bank formats) ────
    const parseCSV = (text) => {
        const lines = text.trim().split(/\r?\n/);
        if (lines.length < 2) { addToast({ type: "warning", title: "File CSV trống hoặc chỉ có header" }); return; }
        // Detect delimiter
        const firstLine = lines[0];
        const delim = firstLine.includes("\t") ? "\t" : firstLine.includes(";") ? ";" : ","
        const parseLine = (line) => {
            if (delim === ",") {
                const result = []; let cur = ""; let inQuote = false;
                for (let i = 0; i < line.length; i++) {
                    const ch = line[i];
                    if (ch === '"') { inQuote = !inQuote; }
                    else if (ch === delim && !inQuote) { result.push(cur.trim()); cur = ""; }
                    else { cur += ch; }
                }
                result.push(cur.trim());
                return result;
            }
            return line.split(delim).map(c => c.trim().replace(/^"|"$/g, ""));
        };
        // Parse header to detect column mapping
        const headerCols = parseLine(lines[0]).map(h => h.toLowerCase().replace(/[^\wàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/g, ""));
        let dateCol = -1, descCol = -1, debitCol = -1, creditCol = -1, amountCol = -1;
        headerCols.forEach((h, i) => {
            if (dateCol < 0 && (h.includes("ngày") || h.includes("ngay") || h.includes("date") || h === "ngàygiaodịch" || h === "ngàyhiệulực")) dateCol = i;
            if (descCol < 0 && (h.includes("diễngiải") || h.includes("diengiai") || h.includes("nộidung") || h.includes("noidung") || h.includes("description") || h.includes("mô") || h.includes("chitiet"))) descCol = i;
            if (debitCol < 0 && (h.includes("ghinợ") || h.includes("ghino") || h.includes("debit") || h.includes("phátsinh") || h.includes("nợ") || h.includes("tiềnra") || h.includes("chi"))) debitCol = i;
            if (creditCol < 0 && (h.includes("ghicó") || h.includes("ghico") || h.includes("credit") || h.includes("có") || h.includes("tiềnvào") || h.includes("thu"))) creditCol = i;
            if (amountCol < 0 && (h.includes("sốtiền") || h.includes("sotien") || h.includes("amount") || h.includes("giátrị"))) amountCol = i;
        });
        // Fallback: positional
        if (dateCol < 0) dateCol = 0;
        if (descCol < 0) descCol = Math.min(1, headerCols.length - 1);

        const entries = [];
        for (let i = 1; i < lines.length; i++) {
            if (!lines[i].trim()) continue;
            const cols = parseLine(lines[i]);
            if (cols.length < 3) continue;
            // Date
            let date = cols[dateCol] || "";
            date = date.replace(/\//g, "-");
            if (/^\d{2}-\d{2}-\d{4}$/.test(date)) { const p = date.split("-"); date = `${p[2]}-${p[1]}-${p[0]}`; }
            if (!/^\d{4}-\d{2}-\d{2}/.test(date)) {
                const m = date.match(/(\d{1,2})[/-](\d{1,2})[/-](\d{4})/);
                if (m) date = `${m[3]}-${m[2].padStart(2, "0")}-${m[1].padStart(2, "0")}`;
            }
            if (date.length > 10) date = date.slice(0, 10);
            // Description
            const desc = cols[descCol] || cols[1] || "";
            // Amount
            let amount = 0;
            const parseNum = s => { if (!s) return 0; return parseFloat(String(s).replace(/[^\d.-]/g, "")) || 0; };
            if (debitCol >= 0 && creditCol >= 0) {
                const debit = parseNum(cols[debitCol]);
                const credit = parseNum(cols[creditCol]);
                amount = credit - debit;
            } else if (amountCol >= 0) {
                amount = parseNum(cols[amountCol]);
            } else {
                // Guess: find numeric columns
                const numCols = cols.map((c, i) => ({ i, v: parseNum(c) })).filter(x => x.v !== 0 && x.i !== dateCol && x.i !== descCol);
                if (numCols.length >= 2) amount = numCols[1].v - numCols[0].v;
                else if (numCols.length === 1) amount = numCols[0].v;
            }
            if (date && amount !== 0) {
                entries.push({ id: `bk${Date.now()}-${i}`, date, amount: Math.round(amount), description: desc, matched: false });
            }
        }
        if (entries.length > 0) {
            setBankData(prev => [...prev, ...entries]);
            const inc = entries.filter(e => e.amount > 0);
            const exp = entries.filter(e => e.amount < 0);
            addToast({
                type: "success", title: `Import ${entries.length} dòng sao kê`,
                detail: `${inc.length} ghi có (${fmtVND(inc.reduce((s, e) => s + e.amount, 0))}) · ${exp.length} ghi nợ (${fmtVND(Math.abs(exp.reduce((s, e) => s + e.amount, 0)))})`
            });
            setShowImport(false); setCsvText("");
        } else {
            addToast({ type: "warning", title: "Không parse được dữ liệu", detail: "Kiểm tra format: cần có cột ngày, diễn giải, số tiền (ghi nợ/ghi có)" });
        }
    };

    const handleFileUpload = (e) => {
        const file = e.target.files?.[0]; if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => { const text = ev.target.result; setCsvText(text); parseCSV(text); };
        reader.readAsText(file, "UTF-8");
        if (fileRef.current) fileRef.current.value = "";
    };

    // ─── Create TX from bank entry (full form with auto-detect) ────
    const detectCategory = (desc, type) => {
        const d = (desc || "").toLowerCase();
        const cats = type === "income" ? categories.income : categories.expense;
        if (type === "expense") {
            if (/nguyên.?liệu|nvl|vật.?liệu|hàng.?hóa|mua.?hàng|nhập.?kho/.test(d)) return cats.find(c => c.id === "c10")?.id || "";
            if (/lương|công|nhân|bảo.?hiểm|bhxh/.test(d)) return cats.find(c => c.id === "c11")?.id || "";
            if (/thuê|mặt.?bằng|nhà/.test(d)) return cats.find(c => c.id === "c12")?.id || "";
            if (/điện|nước|internet|viễn.?thông/.test(d)) return cats.find(c => c.id === "c13")?.id || "";
            if (/vận.?chuyển|ship|giao.?hàng/.test(d)) return cats.find(c => c.id === "c14")?.id || "";
            if (/sửa|bảo.?trì|bảo.?dưỡng/.test(d)) return cats.find(c => c.id === "c16")?.id || "";
        } else {
            if (/doanh.?thu|bán|thu.?tiền|hàng|phí.?dv/.test(d)) return cats.find(c => c.id === "c1")?.id || "";
            if (/dịch.?vụ|catering|phục.?vụ|thi.?công/.test(d)) return cats.find(c => c.id === "c2")?.id || "";
        }
        return cats[0]?.id || "";
    };
    const openCreateForm = (bk) => {
        const type = bk.amount > 0 ? "income" : "expense";
        const catId = detectCategory(bk.description, type);
        setCreateForm({
            bk, type, amount: Math.abs(bk.amount), description: bk.description, tx_date: bk.date,
            category_id: catId, payment_method: "bank_transfer", has_invoice: false, counterparty: "",
            vat_group: business.default_vat_group || "service"
        });
        setShowCreate(bk);
    };
    const handleCreateTx = () => {
        if (!createForm) return;
        const cats = createForm.type === "income" ? categories.income : categories.expense;
        const cat = cats.find(c => c.id === createForm.category_id) || cats[0];
        const tx = {
            id: `tx-${Date.now()}`, type: createForm.type, amount: createForm.amount,
            description: createForm.description, tx_date: createForm.tx_date,
            category_id: cat?.id || "", category_name: cat?.name || "", payment_method: "bank_transfer",
            has_invoice: createForm.has_invoice, status: "confirmed", counterparty: createForm.counterparty,
            reconciled: true, vat_group: createForm.type === "income" ? createForm.vat_group : undefined
        };
        setTransactions(prev => [tx, ...prev]);
        setMatches(p => ({ ...p, [createForm.bk.id]: tx.id }));
        addToast({ type: "success", title: `Tạo ${createForm.type === "income" ? "thu" : "chi"} + ghép`, detail: `${fmtVND(createForm.amount)} — ${createForm.description}` });
        setShowCreate(null); setCreateForm(null);
    };

    // ─── Filtered & sorted bank data ────
    const displayBank = useMemo(() => {
        let list = bankData;
        if (filter === "matched") list = list.filter(b => matches[b.id]);
        if (filter === "unmatched") list = list.filter(b => !matches[b.id]);
        if (searchBank.trim()) {
            const q = searchBank.toLowerCase();
            list = list.filter(b => b.description.toLowerCase().includes(q) || b.date.includes(q) || String(Math.abs(b.amount)).includes(q.replace(/\D/g, "")));
        }
        const sorted = [...list];
        if (sortBank === "date_desc") sorted.sort((a, b) => b.date.localeCompare(a.date));
        else if (sortBank === "date_asc") sorted.sort((a, b) => a.date.localeCompare(b.date));
        else if (sortBank === "amt_desc") sorted.sort((a, b) => Math.abs(b.amount) - Math.abs(a.amount));
        else sorted.sort((a, b) => Math.abs(a.amount) - Math.abs(b.amount));
        return sorted;
    }, [bankData, filter, searchBank, sortBank, matches]);

    const displayTx = useMemo(() => {
        let list = unmatchedTx;
        if (searchTx.trim()) {
            const q = searchTx.toLowerCase();
            list = list.filter(t => t.description.toLowerCase().includes(q) || (t.counterparty || "").toLowerCase().includes(q) || String(t.amount).includes(q.replace(/\D/g, "")));
        }
        return [...list].sort((a, b) => b.tx_date.localeCompare(a.tx_date));
    }, [unmatchedTx, searchTx]);

    // ─── Score label helper ────
    const scoreLabel = (s) => s >= 80 ? "Rất khớp" : s >= 60 ? "Khá khớp" : s >= 40 ? "Có thể" : "Tham khảo";
    const scoreColor = (s) => s >= 80 ? "var(--green)" : s >= 60 ? "var(--blue)" : s >= 40 ? "var(--yellow)" : "var(--text-tertiary)";

    // ─── Render ────
    return (<>
        <div className="page-header"><div><h1 className="page-title">Đối soát ngân hàng</h1><p className="page-subtitle">So khớp sao kê NH ↔ sổ thu chi</p></div>
            <div style={{ display: "flex", gap: 8 }}>
                <button className="btn btn-secondary" onClick={() => setShowGuide(g => !g)} style={{ gap: 4 }}>❓</button>
                <button className="btn btn-secondary" onClick={() => setShowImport(true)}><Icons.Download /> Import CSV</button>
                {matchedCount > 0 && <button className="btn btn-primary" onClick={confirmAll}><Icons.Check /> Xác nhận ({matchedCount})</button>}
            </div>
        </div>
        <div className="page-body">

            {/* Guide (collapsible) */}
            {showGuide && (
                <div className="card fade-up" style={{ marginBottom: 16, border: "1px solid var(--blue)", background: "var(--blue-light)" }}>
                    <div className="card-body" style={{ fontSize: ".8rem", color: "var(--text-secondary)", lineHeight: 1.7, padding: "16px 20px" }}>
                        <div style={{ fontWeight: 700, marginBottom: 6, color: "var(--blue)" }}>Hướng dẫn đối soát ngân hàng:</div>
                        <div><strong>Bước 1:</strong> Import CSV sao kê ngân hàng (hỗ trợ: Vietcombank, BIDV, Techcombank, MB Bank, ACB...)</div>
                        <div><strong>Bước 2:</strong> Nhấn <strong>"Tự động ghép"</strong> — hệ thống chấm điểm theo số tiền, ngày, chiều giao dịch, từ khóa</div>
                        <div><strong>Bước 3:</strong> Các dòng chưa khớp → nhấn vào dòng NH bên trái → xem <strong>gợi ý</strong> bên phải → nhấn chọn để ghép</div>
                        <div><strong>Bước 4:</strong> Dòng NH không có GD tương ứng → nhấn <strong>"+ Tạo GD"</strong> để tạo giao dịch mới kèm đầy đủ danh mục</div>
                        <div><strong>Bước 5:</strong> Kiểm tra xong → nhấn <strong>"Xác nhận"</strong> để cập nhật trạng thái reconciled cho tất cả GD đã ghép</div>
                    </div>
                </div>
            )}

            {/* Summary stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))", gap: 12, marginBottom: 20 }}>
                <div className="stat-card blue" style={{ padding: "12px 14px" }}><div className="stat-label" style={{ fontSize: ".65rem" }}>Sao kê NH</div><div className="stat-value blue" style={{ fontSize: "1.1rem" }}>{bankData.length}</div></div>
                <div className="stat-card green" style={{ padding: "12px 14px" }}><div className="stat-label" style={{ fontSize: ".65rem" }}>Đã ghép</div><div className="stat-value green" style={{ fontSize: "1.1rem" }}>{matchedCount}</div></div>
                <div className="stat-card yellow" style={{ padding: "12px 14px" }}><div className="stat-label" style={{ fontSize: ".65rem" }}>NH chưa khớp</div><div className="stat-value" style={{ fontSize: "1.1rem", color: "var(--yellow)" }}>{unmatchedBank.length}</div></div>
                <div className="stat-card accent" style={{ padding: "12px 14px" }}><div className="stat-label" style={{ fontSize: ".65rem" }}>Sổ chưa khớp</div><div className="stat-value accent" style={{ fontSize: "1.1rem" }}>{unmatchedTx.length}</div></div>
                <div className={`stat-card ${Math.abs(diff) < 1000 ? "green" : "accent"}`} style={{ padding: "12px 14px" }}><div className="stat-label" style={{ fontSize: ".65rem" }}>Chênh lệch</div><div className="stat-value" style={{ fontSize: "1.1rem", color: Math.abs(diff) < 1000 ? "var(--green)" : "var(--red)" }}>{diff === 0 ? "0đ" : fmtVND(Math.abs(diff))}</div></div>
            </div>

            {/* Progress + auto-match */}
            <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16, padding: "12px 16px", background: "var(--bg-elevated)", borderRadius: "var(--radius-md)" }}>
                <div style={{ flex: 1 }}>
                    <div style={{ height: 6, background: "var(--border)", borderRadius: 3, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${bankData.length > 0 ? (matchedCount / bankData.length * 100) : 0}%`, background: matchedCount === bankData.length && bankData.length > 0 ? "var(--green)" : "var(--accent)", borderRadius: 3, transition: "width .5s ease" }} />
                    </div>
                    <div style={{ fontSize: ".72rem", color: "var(--text-tertiary)", marginTop: 4 }}>{bankData.length > 0 ? Math.round(matchedCount / bankData.length * 100) : 0}% hoàn thành</div>
                </div>
                <button className="btn btn-primary" style={{ gap: 6, flexShrink: 0 }} onClick={autoMatch}>🤖 Tự động ghép</button>
                {matchedCount > 0 && <button className="btn btn-secondary" style={{ gap: 4, flexShrink: 0, fontSize: ".78rem" }} onClick={() => { setMatches({}); addToast({ type: "info", title: "Đã xóa tất cả ghép" }); }}><Icons.Trash /> Reset</button>}
            </div>

            {/* Filter + search */}
            <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
                {[{ id: "unmatched", label: `Chưa khớp (${unmatchedBank.length})` }, { id: "all", label: `Tất cả (${bankData.length})` }, { id: "matched", label: `Đã ghép (${matchedCount})` }].map(f => (
                    <button key={f.id} className={`filter-chip ${filter === f.id ? "active" : ""}`} onClick={() => setFilter(f.id)}>{f.label}</button>
                ))}
                <select style={{ marginLeft: "auto", padding: "4px 8px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", fontSize: ".75rem", fontFamily: "var(--font)", background: "var(--bg-card)" }} value={sortBank} onChange={e => setSortBank(e.target.value)}>
                    <option value="date_desc">Mới nhất</option><option value="date_asc">Cũ nhất</option>
                    <option value="amt_desc">Lớn nhất</option><option value="amt_asc">Nhỏ nhất</option>
                </select>
            </div>

            {/* Main: 2 columns (responsive) */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))", gap: 16 }}>

                {/* LEFT — Bank entries */}
                <div className="card card-glow" style={{ overflow: "hidden" }}>
                    <div className="card-header" style={{ background: "var(--blue-light)", padding: "10px 16px" }}>
                        <span className="card-title" style={{ color: "var(--blue)", fontSize: ".88rem" }}>🏦 Sao kê ngân hàng</span>
                    </div>
                    <div style={{ padding: "8px 12px", borderBottom: "1px solid var(--border-light)" }}>
                        <input className="field-input" placeholder="Tìm kiếm sao kê..." value={searchBank} onChange={e => setSearchBank(e.target.value)} style={{ padding: "6px 10px", fontSize: ".78rem" }} />
                    </div>
                    <div style={{ maxHeight: 480, overflow: "auto" }}>
                        {displayBank.length === 0 ? (
                            <div className="empty-state" style={{ padding: 30 }}><div className="empty-icon">{bankData.length === 0 ? "📄" : "✓"}</div><div className="empty-text">{bankData.length === 0 ? "Chưa import sao kê" : "Không có kết quả"}</div>{bankData.length === 0 && <button className="btn btn-primary" style={{ marginTop: 10 }} onClick={() => setShowImport(true)}><Icons.Download /> Import CSV</button>}</div>
                        ) : displayBank.map(bk => {
                            const isMatched = !!matches[bk.id];
                            const txMatch = isMatched ? transactions.find(t => t.id === matches[bk.id]) : null;
                            const isSel = selBank === bk.id;
                            return (
                                <div key={bk.id} onClick={() => { if (!isMatched) setSelBank(isSel ? null : bk.id) }} style={{
                                    padding: "10px 14px", borderBottom: "1px solid var(--border-light)", cursor: isMatched ? "default" : "pointer",
                                    background: isMatched ? "#E8F5E9" : isSel ? "var(--accent-light)" : "var(--bg-card)",
                                    borderLeft: isSel ? "3px solid var(--accent)" : isMatched ? "3px solid var(--green)" : "3px solid transparent",
                                    transition: "all .12s"
                                }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{ fontWeight: 600, fontSize: ".82rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{bk.description}</div>
                                            <div style={{ fontSize: ".7rem", color: "var(--text-tertiary)", marginTop: 1 }}>{fmtDate(bk.date)}</div>
                                        </div>
                                        <div style={{ fontWeight: 700, fontSize: ".88rem", fontFamily: "var(--font-mono)", color: bk.amount > 0 ? "var(--green)" : "var(--accent)", flexShrink: 0 }}>{bk.amount > 0 ? "+" : "−"}{fmtVND(Math.abs(bk.amount))}</div>
                                    </div>
                                    {isMatched && txMatch && (
                                        <div style={{ marginTop: 5, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                            <span style={{ fontSize: ".7rem", color: "var(--green)", fontWeight: 600 }}>✓ → {txMatch.description}</span>
                                            <button style={{ fontSize: ".65rem", color: "var(--red)", background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font)", textDecoration: "underline", padding: 0 }} onClick={e => { e.stopPropagation(); unmatch(bk.id) }}>Bỏ</button>
                                        </div>
                                    )}
                                    {!isMatched && !isSel && (
                                        <div style={{ marginTop: 4, display: "flex", justifyContent: "flex-end" }}>
                                            <button style={{ fontSize: ".65rem", color: "var(--blue)", background: "none", border: "1px solid var(--blue)", borderRadius: 4, padding: "1px 6px", cursor: "pointer", fontFamily: "var(--font)" }} onClick={e => { e.stopPropagation(); openCreateForm(bk) }}>+ Tạo GD</button>
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* RIGHT — Suggestions / Unmatched tx */}
                <div className="card card-glow" style={{ overflow: "hidden" }}>
                    <div className="card-header" style={{ background: selBank ? "var(--accent-light)" : "var(--bg-elevated)", padding: "10px 16px" }}>
                        <span className="card-title" style={{ color: selBank ? "var(--accent)" : "var(--text-secondary)", fontSize: ".88rem" }}>
                            {selBank ? "💡 Gợi ý ghép" : "📒 Sổ thu chi (CK)"}
                        </span>
                        {selBank && <button style={{ fontSize: ".7rem", color: "var(--text-tertiary)", background: "none", border: "1px solid var(--border)", borderRadius: 4, padding: "2px 8px", cursor: "pointer", fontFamily: "var(--font)" }} onClick={() => setSelBank(null)}>Bỏ chọn</button>}
                    </div>
                    {!selBank && (
                        <div style={{ padding: "8px 12px", borderBottom: "1px solid var(--border-light)" }}>
                            <input className="field-input" placeholder="Tìm kiếm giao dịch..." value={searchTx} onChange={e => setSearchTx(e.target.value)} style={{ padding: "6px 10px", fontSize: ".78rem" }} />
                        </div>
                    )}
                    <div style={{ maxHeight: 480, overflow: "auto" }}>
                        {selBank ? (
                            // Suggestion mode
                            suggestions.length === 0 ? (
                                <div className="empty-state" style={{ padding: 30 }}><div className="empty-icon">🔍</div><div className="empty-text">Không tìm thấy GD phù hợp</div>
                                    <button className="btn btn-primary" style={{ marginTop: 10 }} onClick={() => openCreateForm(bankData.find(b => b.id === selBank))}>+ Tạo GD mới từ sao kê</button>
                                </div>
                            ) : (<>
                                <div style={{ padding: "8px 14px", fontSize: ".72rem", color: "var(--text-tertiary)", background: "var(--bg-warm)", borderBottom: "1px solid var(--border-light)" }}>
                                    {suggestions.length} gợi ý — nhấn để ghép · điểm khớp: số tiền + ngày + chiều GD + từ khóa
                                </div>
                                {suggestions.map(({ tx, score }) => (
                                    <div key={tx.id} onClick={() => doMatch(selBank, tx.id)} style={{
                                        padding: "10px 14px", borderBottom: "1px solid var(--border-light)", cursor: "pointer",
                                        transition: "all .12s", background: "var(--bg-card)"
                                    }} onMouseEnter={e => e.currentTarget.style.background = "var(--green-light)"} onMouseLeave={e => e.currentTarget.style.background = "var(--bg-card)"}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <div style={{ fontWeight: 600, fontSize: ".82rem" }}>{tx.description}</div>
                                                <div style={{ fontSize: ".7rem", color: "var(--text-tertiary)", marginTop: 1 }}>
                                                    {fmtDate(tx.tx_date)} • {tx.category_name}{tx.counterparty ? ` • ${tx.counterparty}` : ""}
                                                </div>
                                            </div>
                                            <div style={{ textAlign: "right", flexShrink: 0 }}>
                                                <div style={{ fontWeight: 700, fontSize: ".88rem", fontFamily: "var(--font-mono)", color: tx.type === "income" ? "var(--green)" : "var(--accent)" }}>{tx.type === "income" ? "+" : "−"}{fmtVND(tx.amount)}</div>
                                                <div style={{ fontSize: ".65rem", fontWeight: 700, color: scoreColor(score), marginTop: 2 }}>{score}pt · {scoreLabel(score)}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div style={{ padding: "10px 14px", borderTop: "1px solid var(--border-light)" }}>
                                    <button className="btn btn-secondary" style={{ width: "100%", justifyContent: "center", fontSize: ".78rem" }} onClick={() => openCreateForm(bankData.find(b => b.id === selBank))}>+ Tạo GD mới từ dòng sao kê này</button>
                                </div>
                            </>)
                        ) : (
                            // Normal mode — all unmatched tx
                            displayTx.length === 0 ? (
                                <div className="empty-state" style={{ padding: 30 }}><div className="empty-icon">✓</div><div className="empty-text">Tất cả GD chuyển khoản đã đối soát</div></div>
                            ) : displayTx.map(tx => (
                                <div key={tx.id} style={{ padding: "10px 14px", borderBottom: "1px solid var(--border-light)", fontSize: ".82rem" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{ fontWeight: 600, fontSize: ".82rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{tx.description}</div>
                                            <div style={{ fontSize: ".7rem", color: "var(--text-tertiary)", marginTop: 1 }}>{fmtDate(tx.tx_date)} • {tx.category_name}</div>
                                        </div>
                                        <div style={{ fontWeight: 700, fontSize: ".88rem", fontFamily: "var(--font-mono)", color: tx.type === "income" ? "var(--green)" : "var(--accent)", flexShrink: 0 }}>{tx.type === "income" ? "+" : "−"}{fmtVND(tx.amount)}</div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Matched pairs */}
            {matchedCount > 0 && (
                <div className="card card-glow fade-up" style={{ marginTop: 16 }}>
                    <div className="card-header"><span className="card-title">Các cặp đã ghép ({matchedCount})</span>
                        <button className="btn btn-primary" style={{ fontSize: ".75rem", padding: "4px 14px" }} onClick={confirmAll}><Icons.Check /> Xác nhận tất cả</button>
                    </div>
                    <div style={{ maxHeight: 260, overflow: "auto" }}>
                        {Object.entries(matches).map(([bkId, txId]) => {
                            const bk = bankData.find(b => b.id === bkId); const tx = transactions.find(t => t.id === txId);
                            if (!bk || !tx) return null;
                            const amtOk = Math.abs(bk.amount) === tx.amount;
                            return (
                                <div key={bkId} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", borderBottom: "1px solid var(--border-light)", fontSize: ".78rem" }}>
                                    <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{bk.description}</div><div style={{ fontSize: ".68rem", color: "var(--text-tertiary)" }}>{fmtDate(bk.date)} · {bk.amount > 0 ? "+" : "−"}{fmtVND(Math.abs(bk.amount))}</div></div>
                                    <span style={{ color: amtOk ? "var(--green)" : "var(--yellow)", fontWeight: 700 }}>{amtOk ? "✓" : "≈"}</span>
                                    <div style={{ flex: 1, minWidth: 0, textAlign: "right" }}><div style={{ fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{tx.description}</div><div style={{ fontSize: ".68rem", color: "var(--text-tertiary)" }}>{fmtDate(tx.tx_date)} · {tx.type === "income" ? "+" : "−"}{fmtVND(tx.amount)}</div></div>
                                    <button style={{ color: "var(--red)", background: "none", border: "none", cursor: "pointer", fontSize: ".8rem", padding: 2 }} onClick={() => unmatch(bkId)}>✕</button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>

        {/* ─── Import CSV Modal ─── */}
        {showImport && (
            <div className="modal-overlay" onClick={() => setShowImport(false)}><div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 580 }}>
                <div className="modal-header"><h2 className="modal-title">Import sao kê ngân hàng</h2><button className="modal-close" onClick={() => setShowImport(false)}><Icons.X /></button></div>
                <div className="modal-body">
                    <div style={{ padding: "12px 16px", background: "var(--bg-warm)", borderRadius: "var(--radius-md)", marginBottom: 14, fontSize: ".8rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                        <strong>Hỗ trợ:</strong> CSV, TSV, dấu phân cách dấu phẩy (,) / chấm phẩy (;) / tab. Tự nhận diện cột ngày, diễn giải, ghi nợ/ghi có. Tương thích: Vietcombank, BIDV, Techcombank, MB Bank, ACB, VPBank...
                    </div>
                    <div onClick={() => fileRef.current?.click()} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, padding: "28px 20px", border: "2px dashed var(--border)", borderRadius: "var(--radius-md)", cursor: "pointer", background: "var(--bg-card)", transition: "all .15s", marginBottom: 14 }}>
                        <Icons.Download />
                        <span style={{ fontWeight: 600, fontSize: ".88rem" }}>Kéo thả hoặc nhấn để chọn file</span>
                        <span style={{ fontSize: ".72rem", color: "var(--text-tertiary)" }}>.csv · .txt · .tsv</span>
                    </div>
                    <input ref={fileRef} type="file" accept=".csv,.txt,.tsv" onChange={handleFileUpload} style={{ display: "none" }} />
                    <div className="field">
                        <label className="field-label">Hoặc dán nội dung CSV:</label>
                        <textarea className="field-input" rows={6} placeholder={"Ngày,Diễn giải,Ghi nợ,Ghi có\n28/03/2026,CK Tien dien T3,2200000,0\n25/03/2026,CK tu Nguyen Van B,0,12000000"} value={csvText} onChange={e => setCsvText(e.target.value)} style={{ fontFamily: "var(--font-mono)", fontSize: ".75rem", resize: "vertical" }} />
                    </div>
                    <button className="btn btn-primary btn-lg" style={{ width: "100%", justifyContent: "center", marginTop: 10 }} disabled={!csvText.trim()} onClick={() => parseCSV(csvText)}>Import sao kê</button>
                </div>
            </div></div>
        )}

        {/* ─── Create TX Modal (full form) ─── */}
        {showCreate && createForm && (
            <div className="modal-overlay" onClick={() => { setShowCreate(null); setCreateForm(null) }}><div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 520 }}>
                <div className="modal-header"><h2 className="modal-title">Tạo giao dịch từ sao kê</h2><button className="modal-close" onClick={() => { setShowCreate(null); setCreateForm(null) }}><Icons.X /></button></div>
                <div className="modal-body">
                    {/* Bank entry preview */}
                    <div style={{ padding: "12px 16px", background: "var(--blue-light)", borderRadius: "var(--radius-md)", marginBottom: 16, border: "1px solid var(--blue)22" }}>
                        <div style={{ fontSize: ".72rem", color: "var(--blue)", fontWeight: 600, marginBottom: 4 }}>🏦 Dòng sao kê:</div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ fontWeight: 600, fontSize: ".88rem" }}>{showCreate.description}</span>
                            <span style={{ fontWeight: 700, fontFamily: "var(--font-mono)", color: showCreate.amount > 0 ? "var(--green)" : "var(--accent)" }}>{showCreate.amount > 0 ? "+" : "−"}{fmtVND(Math.abs(showCreate.amount))}</span>
                        </div>
                        <div style={{ fontSize: ".72rem", color: "var(--text-tertiary)", marginTop: 2 }}>{fmtDate(showCreate.date)}</div>
                    </div>

                    {/* Type */}
                    <div className="type-picker" style={{ marginBottom: 12 }}>
                        <div className={`type-option income ${createForm.type === "income" ? "active" : ""}`} onClick={() => setCreateForm(f => ({ ...f, type: "income" }))}>↗ Thu</div>
                        <div className={`type-option expense ${createForm.type === "expense" ? "active" : ""}`} onClick={() => setCreateForm(f => ({ ...f, type: "expense" }))}>↙ Chi</div>
                    </div>

                    <div className="field"><label className="field-label">Mô tả</label><input className="field-input" value={createForm.description} onChange={e => setCreateForm(f => ({ ...f, description: e.target.value }))} /></div>

                    <div className="field-row">
                        <div className="field"><label className="field-label">Ngày</label><input className="field-input" type="date" value={createForm.tx_date} onChange={e => setCreateForm(f => ({ ...f, tx_date: e.target.value }))} /></div>
                        <div className="field"><label className="field-label">Đối tác</label><input className="field-input" placeholder="VD: Chợ đầu mối" value={createForm.counterparty} onChange={e => setCreateForm(f => ({ ...f, counterparty: e.target.value }))} /></div>
                    </div>

                    {/* Category */}
                    <div className="field">
                        <label className="field-label">Danh mục</label>
                        <div className="cat-grid">
                            {(createForm.type === "income" ? categories.income : categories.expense).map(cat => (
                                <div key={cat.id} className={`cat-item ${createForm.category_id === cat.id ? "active" : ""}`} onClick={() => setCreateForm(f => ({ ...f, category_id: cat.id }))}>
                                    <div className="cat-item-icon">{cat.icon}</div>{cat.name}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* VAT group (income only) */}
                    {createForm.type === "income" && (
                        <div className="field">
                            <label className="field-label">Nhóm VAT</label>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                                {VAT_GROUPS.map(g => (<div key={g.id} onClick={() => setCreateForm(f => ({ ...f, vat_group: g.id }))} style={{ padding: "8px 10px", borderRadius: "var(--radius-sm)", border: `2px solid ${createForm.vat_group === g.id ? "var(--accent)" : "var(--border)"}`, background: createForm.vat_group === g.id ? "var(--accent-light)" : "var(--bg-card)", cursor: "pointer", fontSize: ".75rem" }}>
                                    <span>{g.icon} {g.label}</span>
                                    <span style={{ float: "right", fontFamily: "var(--font-mono)", fontWeight: 700, color: createForm.vat_group === g.id ? "var(--accent)" : "var(--text-tertiary)" }}>{g.rateLabel}</span>
                                </div>))}
                            </div>
                        </div>
                    )}

                    {/* Invoice toggle (expense only) */}
                    {createForm.type === "expense" && (
                        <div className="field-toggle-row"><div><div style={{ fontWeight: 600, fontSize: ".85rem" }}>Có hóa đơn?</div></div><button className={`toggle ${createForm.has_invoice ? "on" : ""}`} onClick={() => setCreateForm(f => ({ ...f, has_invoice: !f.has_invoice }))} /></div>
                    )}

                    <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
                        <button className="btn btn-primary btn-lg" style={{ flex: 1, justifyContent: "center" }} onClick={handleCreateTx}>Tạo + Ghép</button>
                        <button className="btn btn-secondary btn-lg" onClick={() => { setShowCreate(null); setCreateForm(null) }}>Hủy</button>
                    </div>
                </div>
            </div></div>
        )}
    </>);
}

// ═══════════════════════════════════════════════════════════════════════════════
// INVENTORY PAGE — S2d-HKD Nhập/Xuất/Tồn kho (TT152/2025)
// ═══════════════════════════════════════════════════════════════════════════════
function InventoryPage({ inventory, setInventory, business, addToast }) {
    const [selectedItem, setSelectedItem] = useState(inventory[0]?.id || null);
    const [showAdd, setShowAdd] = useState(false);
    const [newMove, setNewMove] = useState({ type: "in", desc: "", qty: "", price: "", doc: "", date: new Date().toISOString().slice(0, 10) });
    const [showNewItem, setShowNewItem] = useState(false);
    const [newItem, setNewItem] = useState({ name: "", unit: "kg" });

    const item = inventory.find(i => i.id === selectedItem);
    const calc = item ? calcInventory(item) : null;

    const handleAddMovement = () => {
        if (!item || !newMove.qty) return;
        const movement = { id: "m" + Date.now(), date: newMove.date, type: newMove.type, doc: newMove.doc || ("AUTO-" + Date.now().toString(36).toUpperCase()), desc: newMove.desc, qty: Number(newMove.qty), price: newMove.type === "in" ? Number(newMove.price) : 0 };
        setInventory(prev => prev.map(it => it.id === selectedItem ? { ...it, movements: [...it.movements, movement] } : it));
        setNewMove({ type: "in", desc: "", qty: "", price: "", doc: "", date: new Date().toISOString().slice(0, 10) });
        setShowAdd(false);
        addToast({ type: "success", title: newMove.type === "in" ? "Đã nhập kho" : "Đã xuất kho", detail: `${newMove.qty} ${item.unit} ${item.name}` });
    };

    const handleAddItem = () => {
        if (!newItem.name.trim()) return;
        const ni = { id: "inv" + Date.now(), name: newItem.name.trim(), unit: newItem.unit, opening_qty: 0, opening_value: 0, movements: [] };
        setInventory(prev => [...prev, ni]);
        setSelectedItem(ni.id);
        setShowNewItem(false);
        setNewItem({ name: "", unit: "kg" });
        addToast({ type: "success", title: "Đã thêm mặt hàng", detail: ni.name });
    };

    // Totals
    const totalValue = inventory.reduce((s, it) => { const c = calcInventory(it); return s + c.endVal }, 0);
    const totalItems = inventory.length;

    return (<>
        <div className="page-header"><div><h1 className="page-title">Quản lý tồn kho</h1><p className="page-subtitle">Sổ S2d-HKD — TT152/2025/TT-BTC</p></div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button className="btn btn-secondary" onClick={() => { exportS2d(inventory, business); addToast({ type: "success", title: "Đã xuất S2d-HKD", detail: "CSV + In sổ" }) }}><Icons.Print /> In sổ S2d</button>
                <button className="btn btn-primary" onClick={() => setShowNewItem(true)}><Icons.Plus /> Thêm hàng</button>
            </div>
        </div>
        <div className="page-body">
            {/* Summary stats */}
            <div className="balance-row fade-up">
                <div className="balance-card"><div className="balance-icon" style={{ background: "var(--accent-light)" }}>📦</div><div><div style={{ fontSize: ".72rem", color: "var(--text-tertiary)", fontWeight: 500, textTransform: "uppercase", letterSpacing: ".04em" }}>Mặt hàng</div><div style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--accent)" }}>{totalItems}</div></div></div>
                <div className="balance-card"><div className="balance-icon" style={{ background: "var(--blue-light)" }}>💰</div><div><div style={{ fontSize: ".72rem", color: "var(--text-tertiary)", fontWeight: 500, textTransform: "uppercase", letterSpacing: ".04em" }}>Tổng giá trị tồn</div><div style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--blue)" }}>{fmtVND(totalValue)}</div></div></div>
            </div>

            <div className="inv-grid" style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 20 }}>
                {/* Item list */}
                <div className="card card-glow fade-up" style={{ alignSelf: "start" }}>
                    <div className="card-header"><span className="card-title">Hàng hóa</span></div>
                    <div style={{ padding: "0 8px 8px" }}>
                        {inventory.map(it => {
                            const c = calcInventory(it); return (
                                <div key={it.id} onClick={() => setSelectedItem(it.id)} style={{ padding: "12px 14px", borderRadius: "var(--radius-md)", cursor: "pointer", background: selectedItem === it.id ? "var(--accent-light)" : "transparent", border: selectedItem === it.id ? "1px solid rgba(232,93,44,.2)" : "1px solid transparent", marginBottom: 4, transition: "all .15s" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <span style={{ fontWeight: 600, fontSize: ".88rem" }}>{it.name}</span>
                                        <span style={{ fontSize: ".72rem", fontFamily: "var(--font-mono)", fontWeight: 700, color: c.endQty > 0 ? "var(--blue)" : "var(--red)" }}>{c.endQty} {it.unit}</span>
                                    </div>
                                    <div style={{ fontSize: ".72rem", color: "var(--text-tertiary)", marginTop: 2 }}>Giá trị: {fmtVND(c.endVal)}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Detail panel */}
                <div>
                    {item && calc ? (
                        <div className="card card-glow fade-up" style={{ animationDelay: ".05s" }}>
                            <div className="card-header">
                                <div>
                                    <span className="card-title">{item.name}</span>
                                    <div style={{ fontSize: ".72rem", color: "var(--text-tertiary)", marginTop: 2 }}>ĐVT: {item.unit} · Tồn: {calc.endQty} · Giá trị: {fmtVND(calc.endVal)}</div>
                                </div>
                                <button className="btn btn-primary" onClick={() => setShowAdd(true)}><Icons.Plus /> Nhập/Xuất</button>
                            </div>
                            <div className="card-body" style={{ padding: 0, overflowX: "auto" }}>
                                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".78rem" }}>
                                    <thead><tr style={{ background: "var(--bg-elevated)" }}>
                                        <th style={{ padding: "10px 12px", textAlign: "left", fontWeight: 600, fontSize: ".7rem", textTransform: "uppercase", letterSpacing: ".04em", color: "var(--text-tertiary)" }}>Ngày</th>
                                        <th style={{ padding: "10px 12px", textAlign: "left", fontWeight: 600, fontSize: ".7rem", textTransform: "uppercase", letterSpacing: ".04em", color: "var(--text-tertiary)" }}>Chứng từ</th>
                                        <th style={{ padding: "10px 12px", textAlign: "left", fontWeight: 600, fontSize: ".7rem", textTransform: "uppercase", letterSpacing: ".04em", color: "var(--text-tertiary)" }}>Diễn giải</th>
                                        <th style={{ padding: "10px 8px", textAlign: "right", fontWeight: 600, fontSize: ".7rem", color: "var(--text-tertiary)" }}>Đ.giá</th>
                                        <th style={{ padding: "10px 8px", textAlign: "right", fontWeight: 600, fontSize: ".7rem", color: "var(--green)" }}>Nhập</th>
                                        <th style={{ padding: "10px 8px", textAlign: "right", fontWeight: 600, fontSize: ".7rem", color: "var(--accent)" }}>Xuất</th>
                                        <th style={{ padding: "10px 8px", textAlign: "right", fontWeight: 600, fontSize: ".7rem", color: "var(--blue)" }}>Tồn</th>
                                        <th style={{ padding: "10px 12px", textAlign: "right", fontWeight: 600, fontSize: ".7rem", color: "var(--blue)" }}>Giá trị tồn</th>
                                    </tr></thead>
                                    <tbody>
                                        <tr style={{ background: "var(--bg-warm)" }}><td colSpan="4" style={{ padding: "8px 12px", fontWeight: 600, fontStyle: "italic" }}>Tồn đầu kỳ</td><td></td><td></td>
                                            <td style={{ padding: "8px", textAlign: "right", fontFamily: "var(--font-mono)", fontWeight: 600 }}>{item.opening_qty}</td>
                                            <td style={{ padding: "8px 12px", textAlign: "right", fontFamily: "var(--font-mono)", fontWeight: 600 }}>{fmtVND(item.opening_value)}</td>
                                        </tr>
                                        {calc.rows.map(r => (
                                            <tr key={r.id} style={{ borderBottom: "1px solid var(--border-light)" }}>
                                                <td style={{ padding: "8px 12px" }}>{fmtDate(r.date)}</td>
                                                <td style={{ padding: "8px 12px", fontFamily: "var(--font-mono)", fontSize: ".72rem" }}>{r.doc}</td>
                                                <td style={{ padding: "8px 12px" }}>{r.desc}</td>
                                                <td style={{ padding: "8px", textAlign: "right", fontFamily: "var(--font-mono)" }}>{fmt(r.unitPrice)}</td>
                                                <td style={{ padding: "8px", textAlign: "right", fontFamily: "var(--font-mono)", color: r.inQty ? "var(--green)" : "", fontWeight: r.inQty ? 600 : 400 }}>{r.inQty || ""}</td>
                                                <td style={{ padding: "8px", textAlign: "right", fontFamily: "var(--font-mono)", color: r.outQty ? "var(--accent)" : "", fontWeight: r.outQty ? 600 : 400 }}>{r.outQty || ""}</td>
                                                <td style={{ padding: "8px", textAlign: "right", fontFamily: "var(--font-mono)", fontWeight: 600, color: "var(--blue)" }}>{r.stockQty}</td>
                                                <td style={{ padding: "8px 12px", textAlign: "right", fontFamily: "var(--font-mono)" }}>{fmtVND(r.stockVal)}</td>
                                            </tr>
                                        ))}
                                        <tr style={{ background: "var(--bg-elevated)", fontWeight: 700 }}>
                                            <td colSpan="4" style={{ padding: "10px 12px", textAlign: "right" }}>Cộng kỳ / Tồn cuối:</td>
                                            <td style={{ padding: "10px 8px", textAlign: "right", fontFamily: "var(--font-mono)", color: "var(--green)" }}>{calc.rows.reduce((s, r) => s + r.inQty, 0)}</td>
                                            <td style={{ padding: "10px 8px", textAlign: "right", fontFamily: "var(--font-mono)", color: "var(--accent)" }}>{calc.rows.reduce((s, r) => s + r.outQty, 0)}</td>
                                            <td style={{ padding: "10px 8px", textAlign: "right", fontFamily: "var(--font-mono)", color: "var(--blue)" }}>{calc.endQty}</td>
                                            <td style={{ padding: "10px 12px", textAlign: "right", fontFamily: "var(--font-mono)", color: "var(--blue)" }}>{fmtVND(calc.endVal)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div style={{ padding: "14px 24px", fontSize: ".72rem", color: "var(--text-tertiary)", background: "var(--bg-elevated)", borderBottomLeftRadius: "var(--radius-lg)", borderBottomRightRadius: "var(--radius-lg)" }}>
                                📋 Đơn giá xuất kho = (GT tồn đầu kỳ + GT nhập trong kỳ) / (SL tồn đầu kỳ + SL nhập trong kỳ) — TT152/2025
                            </div>
                        </div>
                    ) : (
                        <div className="card card-glow fade-up" style={{ padding: 40, textAlign: "center", color: "var(--text-tertiary)" }}>
                            <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>📦</div>
                            <div style={{ fontWeight: 600 }}>Chọn mặt hàng để xem chi tiết nhập/xuất/tồn</div>
                        </div>
                    )}
                </div>
            </div>

            {/* Add movement modal */}
            {showAdd && item && (
                <div className="modal-overlay" onClick={() => setShowAdd(false)}><div className="modal card-glow" onClick={e => e.stopPropagation()}>
                    <div className="modal-header"><h2 className="modal-title">{newMove.type === "in" ? "Nhập kho" : "Xuất kho"} — {item.name}</h2><button className="modal-close" onClick={() => setShowAdd(false)}><Icons.X /></button></div>
                    <div className="modal-body">
                        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                            <button className={`btn ${newMove.type === "in" ? "btn-primary" : "btn-secondary"}`} onClick={() => setNewMove({ ...newMove, type: "in" })} style={{ flex: 1, justifyContent: "center" }}>📥 Nhập kho</button>
                            <button className={`btn ${newMove.type === "out" ? "btn-primary" : "btn-secondary"}`} onClick={() => setNewMove({ ...newMove, type: "out" })} style={{ flex: 1, justifyContent: "center" }}>📤 Xuất kho</button>
                        </div>
                        <div className="field"><label className="field-label">Diễn giải</label><input className="field-input" placeholder="Mua NVL / Xuất dùng..." value={newMove.desc} onChange={e => setNewMove({ ...newMove, desc: e.target.value })} /></div>
                        <div className="field-row">
                            <div className="field"><label className="field-label">Số lượng ({item.unit})</label><input className="field-input" type="number" value={newMove.qty} onChange={e => setNewMove({ ...newMove, qty: e.target.value })} style={{ fontFamily: "var(--font-mono)" }} /></div>
                            {newMove.type === "in" && <div className="field"><label className="field-label">Đơn giá nhập</label><input className="field-input" type="number" value={newMove.price} onChange={e => setNewMove({ ...newMove, price: e.target.value })} style={{ fontFamily: "var(--font-mono)" }} /></div>}
                        </div>
                        <div className="field-row">
                            <div className="field"><label className="field-label">Ngày</label><input className="field-input" type="date" value={newMove.date} onChange={e => setNewMove({ ...newMove, date: e.target.value })} /></div>
                            <div className="field"><label className="field-label">Số chứng từ</label><input className="field-input" placeholder="HD001..." value={newMove.doc} onChange={e => setNewMove({ ...newMove, doc: e.target.value })} style={{ fontFamily: "var(--font-mono)" }} /></div>
                        </div>
                        {newMove.type === "out" && calc && <div style={{ padding: "10px 14px", background: "var(--yellow-light)", borderRadius: "var(--radius-sm)", fontSize: ".78rem", color: "var(--yellow)", fontWeight: 500 }}>
                            Tồn hiện tại: {calc.endQty} {item.unit} — Đơn giá xuất bình quân: {calc.endQty > 0 ? fmtVND(Math.round(calc.endVal / calc.endQty)) : "—"}/{item.unit}
                        </div>}
                        <button className="btn btn-primary btn-lg" style={{ width: "100%", justifyContent: "center", marginTop: 12 }} onClick={handleAddMovement} disabled={!newMove.qty}>{newMove.type === "in" ? "Xác nhận nhập kho" : "Xác nhận xuất kho"}</button>
                    </div>
                </div></div>
            )}

            {/* Add new item modal */}
            {showNewItem && (
                <div className="modal-overlay" onClick={() => setShowNewItem(false)}><div className="modal card-glow" onClick={e => e.stopPropagation()} style={{ maxWidth: 400 }}>
                    <div className="modal-header"><h2 className="modal-title">Thêm mặt hàng mới</h2><button className="modal-close" onClick={() => setShowNewItem(false)}><Icons.X /></button></div>
                    <div className="modal-body">
                        <div className="field"><label className="field-label">Tên hàng hóa / vật liệu</label><input className="field-input" placeholder="VD: Bánh phở, Thịt bò..." value={newItem.name} onChange={e => setNewItem({ ...newItem, name: e.target.value })} autoFocus /></div>
                        <div className="field"><label className="field-label">Đơn vị tính</label>
                            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                                {["kg", "lít", "bó", "hộp", "thùng", "cái", "gói", "chai"].map(u => (
                                    <button key={u} className={`btn ${newItem.unit === u ? "btn-primary" : "btn-secondary"}`} onClick={() => setNewItem({ ...newItem, unit: u })} style={{ padding: "6px 14px", fontSize: ".82rem" }}>{u}</button>
                                ))}
                            </div>
                        </div>
                        <button className="btn btn-primary btn-lg" style={{ width: "100%", justifyContent: "center", marginTop: 12 }} onClick={handleAddItem} disabled={!newItem.name.trim()}>Thêm mặt hàng</button>
                    </div>
                </div></div>
            )}
        </div>
    </>);
}

// ═══════════════════════════════════════════════════════════════════════════════
// NUMBER TO VIETNAMESE WORDS
// ═══════════════════════════════════════════════════════════════════════════════
function numToVietnamese(n) {
    if (n === 0) return "Không đồng";
    const ones = ["", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"];
    const readGroup = (h, t, u, hasHigher) => {
        let s = "";
        if (h > 0) s += ones[h] + " trăm ";
        else if (hasHigher && (t > 0 || u > 0)) s += "không trăm ";
        if (t > 1) s += ones[t] + " mươi ";
        else if (t === 1) s += "mười ";
        else if (t === 0 && h > 0 && u > 0) s += "lẻ ";
        if (u === 5 && t > 0) s += "lăm";
        else if (u === 1 && t > 1) s += "mốt";
        else if (u > 0) s += ones[u];
        return s.trim();
    };
    const units = ["", "nghìn", "triệu", "tỷ", "nghìn tỷ", "triệu tỷ"];
    const str = String(Math.abs(Math.floor(n)));
    const groups = [];
    for (let i = str.length; i > 0; i -= 3)groups.unshift(str.slice(Math.max(0, i - 3), i));
    let result = "";
    const len = groups.length;
    groups.forEach((g, i) => {
        const num = parseInt(g);
        if (num === 0) return;
        const digits = g.padStart(3, "0");
        const h = parseInt(digits[0]), t = parseInt(digits[1]), u = parseInt(digits[2]);
        const txt = readGroup(h, t, u, i > 0 || len > 1);
        if (txt) result += (result ? " " : "") + txt + " " + units[len - 1 - i];
    });
    result = result.trim() + " đồng";
    return result.charAt(0).toUpperCase() + result.slice(1);
}

// ═══════════════════════════════════════════════════════════════════════════════
// INVOICE PAGE — Lập hóa đơn bán hàng (Mẫu theo NĐ123/TT78)
// ═══════════════════════════════════════════════════════════════════════════════
function InvoicePage({ business, setBusiness, addToast, transactions, setTransactions, categories, wallets, invoices, setInvoices }) {
    const [view, setView] = useState("list");
    const [editingInv, setEditingInv] = useState(null);
    const [searchQ, setSearchQ] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    const emptyForm = () => ({ buyer_name: "", buyer_company: "", buyer_tax_id: "", buyer_address: "", payment_method: "TM/CK", items: [{ name: "", unit: "", qty: 1, price: 0 }], note: business.inv_note || "", date: new Date().toISOString().split("T")[0] });
    const [form, setForm] = useState(emptyForm);
    const upForm = (k, v) => setForm(p => ({ ...p, [k]: v }));
    const updateItem = (idx, key, val) => setForm(p => { const items = [...p.items]; items[idx] = { ...items[idx], [key]: val }; return { ...p, items } });
    const addItem = () => setForm(p => ({ ...p, items: [...p.items, { name: "", unit: "", qty: 1, price: 0 }] }));
    const removeItem = (idx) => setForm(p => ({ ...p, items: p.items.filter((_, i) => i !== idx) }));

    const total = form.items.reduce((s, it) => s + (it.qty || 0) * (it.price || 0), 0);
    const invNumber = String(business.inv_counter || 1).padStart(7, "0");
    const serial = business.inv_serial || "2C26THH";
    const missingConfig = !business.inv_phone && !business.inv_email && !business.inv_bank_account;

    const filtered = invoices.filter(inv => {
        if (statusFilter !== "all" && inv.status !== statusFilter) return false;
        if (searchQ) { const q = searchQ.toLowerCase(); return (inv.buyer_name || "").toLowerCase().includes(q) || (inv.buyer_company || "").toLowerCase().includes(q) || (inv.number || "").includes(q) }
        return true;
    });

    const saveInvoice = () => {
        if (!form.items.some(it => it.name && it.price > 0)) { addToast({ type: "warning", title: "Chưa có hàng hóa", detail: "Thêm ít nhất 1 dòng hàng hóa/dịch vụ" }); return }
        const inv = {
            id: editingInv?.id || `INV-${Date.now()}`, number: editingInv?.number || invNumber, serial, ...form, total, total_words: numToVietnamese(total),
            seller: { name: business.name, tax_id: business.tax_id, address: business.address, phone: business.inv_phone, email: business.inv_email, bank_account: business.inv_bank_account, bank_name: business.inv_bank_name, logo: business.inv_logo },
            created_at: editingInv?.created_at || new Date().toISOString(), updated_at: new Date().toISOString(), status: editingInv?.status || "draft"
        };
        if (editingInv) { setInvoices(p => p.map(x => x.id === inv.id ? inv : x)); addToast({ type: "success", title: "Đã cập nhật", detail: `HĐ ${inv.number}` }) }
        else { setInvoices(p => [inv, ...p]); setBusiness(prev => ({ ...prev, inv_counter: (prev.inv_counter || 1) + 1 })); addToast({ type: "success", title: "Đã tạo hóa đơn", detail: `${inv.number} — ${fmtVND(total)}` }) }
        setEditingInv(inv); setView("preview");
    };
    const deleteInvoice = (inv) => { setInvoices(p => p.filter(x => x.id !== inv.id)); addToast({ type: "success", title: "Đã xóa", detail: `${inv.serial}-${inv.number}` }); setDeleteConfirm(null); setView("list") };

    const printInvoice = () => {
        const el = document.getElementById("invoice-preview-print"); if (!el) return;
        const htmlContent = `<html><head><title>HĐ ${serial}-${editingInv?.number || invNumber}</title><style>
      *{margin:0;padding:0;box-sizing:border-box}body{font-family:'Times New Roman',Georgia,serif;padding:15mm;color:#1a1a2e;font-size:11pt;line-height:1.5}
      table{width:100%;border-collapse:collapse}
      .no-print{margin:0 0 16px;padding:10px 16px;background:#f0f0f0;border-radius:6px;display:flex;align-items:center;gap:12;font-size:13px;font-family:'Times New Roman',serif}
      .no-print button{padding:8px 20px;border:none;border-radius:4px;font-weight:bold;cursor:pointer;font-size:13px;font-family:'Times New Roman',serif}
      @media print{.no-print{display:none!important}@page{size:A4;margin:15mm}body{padding:0}.inv-header-band{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
    </style></head><body>
    <div class="no-print">
      <button style="background:#1a3a5c;color:white" onclick="window.print()">🖨️ In / Lưu PDF</button>
      <button style="background:#e0e0e0;color:#333" onclick="window.close()">✕ Đóng</button>
      <span style="flex:1;text-align:right;color:#666;font-style:italic">HĐ ${serial}-${editingInv?.number || invNumber}</span>
    </div>
    ${el.innerHTML}</body></html>`;
        // Try window.open first, fallback to iframe
        try {
            const w = window.open("", "_blank", "width=800,height=1100");
            if (w && !w.closed) { w.document.write(htmlContent); w.document.close(); return }
        } catch (e) { }
        const iframeId = "inv-print-" + Date.now();
        const iframe = document.createElement("iframe"); iframe.id = iframeId;
        iframe.style.cssText = "position:fixed;top:0;left:0;width:100vw;height:100vh;border:none;z-index:99999;background:white";
        document.body.appendChild(iframe);
        const doc = iframe.contentDocument || iframe.contentWindow.document;
        const closeScript = `<script>function closePrintOverlay(){window.parent.document.getElementById('${iframeId}').remove()}<\/script>`;
        doc.open(); doc.write(htmlContent.replace('onclick="window.close()"', 'onclick="closePrintOverlay()"').replace('</head>', closeScript + '</head>')); doc.close();
    };

    const createFromTx = (tx) => { setForm({ ...emptyForm(), buyer_name: tx.counterparty || "", items: [{ name: tx.description, unit: "", qty: 1, price: tx.amount }], date: tx.tx_date, payment_method: tx.payment_method === "bank_transfer" ? "CK" : tx.payment_method === "ewallet" ? "Ví điện tử" : "TM" }); setEditingInv(null); setView("create") };
    const editInv = (inv) => { setForm({ buyer_name: inv.buyer_name, buyer_company: inv.buyer_company, buyer_tax_id: inv.buyer_tax_id, buyer_address: inv.buyer_address, payment_method: inv.payment_method, items: inv.items, note: inv.note || "", date: inv.date }); setEditingInv(inv); setView("create") };
    const previewInv = (inv) => { setForm({ buyer_name: inv.buyer_name, buyer_company: inv.buyer_company, buyer_tax_id: inv.buyer_tax_id, buyer_address: inv.buyer_address, payment_method: inv.payment_method, items: inv.items, note: inv.note || "", date: inv.date }); setEditingInv(inv); setView("preview") };

    const d = new Date(form.date + "T00:00:00");
    const day = d.getDate(), month = d.getMonth() + 1, year = d.getFullYear();
    const totalRevenue = invoices.reduce((s, i) => s + i.total, 0);
    const draftCount = invoices.filter(i => i.status === "draft").length;
    const sentCount = invoices.filter(i => i.status === "sent").length;
    const thisMonth = invoices.filter(i => { const id = new Date(i.date + "T00:00:00"); return id.getMonth() === new Date().getMonth() && id.getFullYear() === new Date().getFullYear() }).length;
    const pill = (active, c) => ({ padding: "6px 16px", borderRadius: 20, border: active ? `2px solid ${c}` : "2px solid var(--border)", background: active ? `${c}14` : "transparent", color: active ? c : "var(--text-tertiary)", fontWeight: active ? 700 : 500, fontSize: ".76rem", cursor: "pointer", transition: "all .2s", fontFamily: "var(--font)", display: "inline-flex", alignItems: "center", gap: 5 });

    // ═══ LIST VIEW ═══
    if (view === "list") return (<>
        <div className="page-header">
            <div><h1 className="page-title">Hóa đơn bán hàng</h1><p className="page-subtitle">Lập, quản lý và in hóa đơn điện tử theo NĐ123</p></div>
            <button className="btn btn-primary" onClick={() => { setForm(emptyForm()); setEditingInv(null); setView("create") }} style={{ gap: 8, boxShadow: "0 4px 16px rgba(99,102,241,.28)" }}><Icons.Plus /> Lập hóa đơn</button>
        </div>
        <div className="page-body">
            {missingConfig && (
                <div className="fade-up" style={{ marginBottom: 20, borderRadius: 14, background: "linear-gradient(135deg,#fffbeb,#fef3c7)", border: "1px solid #fbbf24", padding: "14px 20px", display: "flex", alignItems: "center", gap: 14, boxShadow: "0 2px 10px rgba(251,191,36,.1)" }}>
                    <div style={{ width: 38, height: 38, borderRadius: 10, background: "linear-gradient(135deg,#f59e0b,#d97706)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".95rem", flexShrink: 0, boxShadow: "0 2px 8px rgba(217,119,6,.25)" }}>⚙️</div>
                    <div style={{ flex: 1 }}><div style={{ fontWeight: 700, fontSize: ".84rem", color: "#92400e" }}>Chưa thiết lập thông tin hóa đơn</div><div style={{ fontSize: ".72rem", color: "#a16207", marginTop: 1 }}>Vào <b>Cài đặt thuế → Cài đặt hóa đơn</b> để cập nhật logo, SĐT, ngân hàng.</div></div>
                </div>
            )}

            {/* Stat cards */}
            <div className="fade-up inv-stat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 22 }}>
                {[
                    { label: "Tổng HĐ", value: invoices.length, sub: "hóa đơn", grad: "linear-gradient(135deg,#6366f1,#8b5cf6)", glow: "rgba(99,102,241,.15)" },
                    { label: "Doanh thu", value: fmtVND(totalRevenue), sub: "tất cả HĐ", grad: "linear-gradient(135deg,#10b981,#059669)", glow: "rgba(16,185,129,.15)", sm: true },
                    { label: "Tháng này", value: thisMonth, sub: "HĐ mới tháng " + String(new Date().getMonth() + 1).padStart(2, "0"), grad: "linear-gradient(135deg,#3b82f6,#2563eb)", glow: "rgba(59,130,246,.15)" },
                    { label: "Số tiếp theo", value: invNumber, sub: serial, grad: "linear-gradient(135deg,#f59e0b,#d97706)", glow: "rgba(245,158,11,.15)", mono: true },
                ].map((s, i) => (
                    <div key={i} style={{ padding: "18px 20px", borderRadius: 14, background: "var(--bg-card)", border: "1px solid var(--border)", position: "relative", overflow: "hidden", boxShadow: `0 4px 16px ${s.glow}`, transition: "transform .2s,box-shadow .2s", cursor: "default" }}
                        onMouseOver={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 28px ${s.glow}` }} onMouseOut={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = `0 4px 16px ${s.glow}` }}>
                        <div style={{ position: "absolute", top: -10, right: -10, width: 50, height: 50, borderRadius: "50%", background: s.grad, opacity: .07 }} />
                        <div style={{ fontSize: ".62rem", color: "var(--text-tertiary)", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".6px", marginBottom: 8 }}>{s.label}</div>
                        <div style={{ fontSize: s.sm ? ".92rem" : "1.4rem", fontWeight: 800, background: s.grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontFamily: s.mono ? "var(--font-mono)" : "var(--font)", letterSpacing: s.mono ? ".5px" : "-.3px", lineHeight: 1.1 }}>{s.value}</div>
                        <div style={{ fontSize: ".6rem", color: "var(--text-tertiary)", marginTop: 5 }}>{s.sub}</div>
                    </div>
                ))}
            </div>

            {/* Search + filter */}
            <div className="fade-up" style={{ display: "flex", gap: 10, marginBottom: 18, alignItems: "center", animationDelay: ".04s" }}>
                <div style={{ flex: 1, position: "relative" }}>
                    <input className="field-input" placeholder="Tìm người mua, số HĐ..." value={searchQ} onChange={e => setSearchQ(e.target.value)}
                        style={{ padding: "10px 12px 10px 38px", fontSize: ".84rem", borderRadius: 10, margin: 0, background: "var(--bg-card)" }} />
                    <svg style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", width: 15, height: 15, color: "var(--text-tertiary)" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
                    {searchQ && <button style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-tertiary)", fontSize: ".8rem" }} onClick={() => setSearchQ("")}>✕</button>}
                </div>
                <button style={pill(statusFilter === "all", "var(--accent)")} onClick={() => setStatusFilter("all")}>Tất cả <b style={{ fontFamily: "var(--font-mono)", fontSize: ".66rem" }}>{invoices.length}</b></button>
                <button style={pill(statusFilter === "draft", "#f59e0b")} onClick={() => setStatusFilter("draft")}>Nháp <b style={{ fontFamily: "var(--font-mono)", fontSize: ".66rem" }}>{draftCount}</b></button>
                <button style={pill(statusFilter === "sent", "#10b981")} onClick={() => setStatusFilter("sent")}>Đã gửi <b style={{ fontFamily: "var(--font-mono)", fontSize: ".66rem" }}>{sentCount}</b></button>
            </div>

            {/* Quick create */}
            {invoices.length === 0 && transactions.filter(t => t.type === "income").length > 0 && (
                <div className="card card-glow fade-up" style={{ marginBottom: 20, animationDelay: ".06s" }}>
                    <div className="card-header" style={{ background: "linear-gradient(135deg,rgba(16,185,129,.05),transparent)" }}><span className="card-title" style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ width: 22, height: 22, borderRadius: 6, background: "linear-gradient(135deg,#10b981,#059669)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: ".55rem", color: "white" }}>⚡</span> Tạo nhanh từ giao dịch thu</span></div>
                    <div className="card-body" style={{ padding: "4px 12px" }}>
                        {transactions.filter(t => t.type === "income").slice(0, 5).map((tx, i) => (
                            <div key={tx.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 10px", borderBottom: i < 4 ? "1px solid var(--border-light)" : "none", cursor: "pointer", borderRadius: 8, transition: "all .2s" }}
                                onClick={() => createFromTx(tx)} onMouseOver={e => { e.currentTarget.style.background = "var(--accent-light)"; e.currentTarget.style.transform = "translateX(4px)" }} onMouseOut={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = "" }}>
                                <div style={{ width: 30, height: 30, borderRadius: 8, background: "linear-gradient(135deg,#d1fae5,#a7f3d0)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".7rem", color: "#059669", flexShrink: 0, fontWeight: 700 }}>↗</div>
                                <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontWeight: 600, fontSize: ".82rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{tx.description}</div><div style={{ fontSize: ".66rem", color: "var(--text-tertiary)" }}>{fmtDate(tx.tx_date)} · {tx.counterparty || "—"}</div></div>
                                <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: ".82rem", color: "var(--green)" }}>{fmtVND(tx.amount)}</span>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="2" style={{ opacity: .4 }}><path d="m9 18 6-6-6-6" /></svg>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Invoice list */}
            <div className="card card-glow fade-up" style={{ animationDelay: ".08s" }}>
                <div className="card-body" style={{ padding: filtered.length === 0 ? "44px 20px" : "6px 8px" }}>
                    {filtered.length === 0 ? (
                        <div style={{ textAlign: "center", color: "var(--text-tertiary)" }}>
                            <div style={{ width: 72, height: 72, borderRadius: 20, background: "linear-gradient(135deg,var(--accent-light),rgba(99,102,241,.06))", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", marginBottom: 14 }}>📄</div>
                            <div style={{ fontWeight: 700, fontSize: ".95rem", color: "var(--text-secondary)", marginBottom: 6 }}>{searchQ || statusFilter !== "all" ? "Không tìm thấy" : "Chưa có hóa đơn nào"}</div>
                            <div style={{ fontSize: ".78rem", maxWidth: 300, margin: "0 auto", lineHeight: 1.5 }}>{searchQ || statusFilter !== "all" ? "Thay đổi bộ lọc hoặc từ khóa" : "Nhấn \"Lập hóa đơn\" để bắt đầu"}</div>
                        </div>
                    ) : filtered.map((inv, i) => {
                        const isSent = inv.status === "sent";
                        return (
                            <div key={inv.id} className="fade-up" style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 14px", marginBottom: 3, borderRadius: 12, cursor: "pointer", transition: "all .2s ease", border: "1px solid transparent", animationDelay: `${i * .025}s` }}
                                onClick={() => previewInv(inv)} onMouseOver={e => { e.currentTarget.style.background = "var(--bg-elevated)"; e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 4px 14px rgba(0,0,0,.04)" }} onMouseOut={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "transparent"; e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "" }}>
                                <div style={{ width: 3, height: 40, borderRadius: 4, background: isSent ? "linear-gradient(180deg,#10b981,#059669)" : "linear-gradient(180deg,#f59e0b,#d97706)", flexShrink: 0 }} />
                                <div style={{ flexShrink: 0, minWidth: 105 }}>
                                    <div style={{ fontWeight: 600, fontSize: ".72rem", fontFamily: "var(--font-mono)", color: "var(--text-tertiary)", letterSpacing: ".3px" }}>{inv.serial}</div>
                                    <div style={{ fontWeight: 800, fontSize: ".95rem", fontFamily: "var(--font-mono)", color: "var(--accent)" }}>{inv.number}</div>
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                                        <span style={{ fontWeight: 600, fontSize: ".86rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{inv.buyer_company || inv.buyer_name || "Khách lẻ"}</span>
                                        <span style={{ padding: "2px 10px", borderRadius: 20, fontSize: ".56rem", fontWeight: 700, letterSpacing: ".4px", textTransform: "uppercase", background: isSent ? "linear-gradient(135deg,#d1fae5,#a7f3d0)" : "linear-gradient(135deg,#fef3c7,#fde68a)", color: isSent ? "#065f46" : "#92400e" }}>{isSent ? "Đã gửi" : "Nháp"}</span>
                                    </div>
                                    <div style={{ fontSize: ".7rem", color: "var(--text-tertiary)", display: "flex", alignItems: "center", gap: 6 }}>
                                        <span>{fmtDate(inv.date)}</span><span style={{ opacity: .3 }}>·</span>
                                        <span>{inv.items.length} mặt hàng</span><span style={{ opacity: .3 }}>·</span>
                                        <span>{inv.payment_method}</span>
                                    </div>
                                </div>
                                <div style={{ fontWeight: 800, fontFamily: "var(--font-mono)", fontSize: ".95rem", color: "var(--green)", flexShrink: 0 }}>{fmtVND(inv.total)}</div>
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="2" style={{ flexShrink: 0, opacity: .3 }}><path d="m9 18 6-6-6-6" /></svg>
                            </div>);
                    })}
                </div>
            </div>
        </div>
    </>);

    // ═══ CREATE / EDIT ═══
    if (view === "create") return (<>
        <div className="page-header">
            <div><h1 className="page-title">{editingInv ? "Chỉnh sửa hóa đơn" : "Lập hóa đơn mới"}</h1><p className="page-subtitle" style={{ fontFamily: "var(--font-mono)", letterSpacing: ".3px" }}>{serial} — {editingInv?.number || invNumber}</p></div>
            <div style={{ display: "flex", gap: 8 }}>
                <button className="btn btn-secondary" onClick={() => setView(editingInv ? "preview" : "list")} style={{ gap: 6 }}><Icons.X /> Hủy</button>
                <button className="btn btn-primary" onClick={saveInvoice} style={{ gap: 8, boxShadow: "0 4px 16px rgba(99,102,241,.25)" }}><Icons.Check /> {editingInv ? "Lưu" : "Tạo hóa đơn"}</button>
            </div>
        </div>
        <div className="page-body">
            <div className="inv-create-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>
                {/* LEFT: Form */}
                <div>
                    {/* Date + Payment */}
                    <div className="card card-glow fade-up" style={{ marginBottom: 14 }}>
                        <div className="card-body" style={{ padding: "14px 20px" }}>
                            <div className="field-row" style={{ marginBottom: 0 }}>
                                <div className="field" style={{ marginBottom: 0 }}><label className="field-label" style={{ fontSize: ".64rem", textTransform: "uppercase", letterSpacing: ".5px", marginBottom: 4 }}>📅 Ngày lập</label><input className="field-input" type="date" value={form.date} onChange={e => upForm("date", e.target.value)} style={{ fontFamily: "var(--font-mono)" }} /></div>
                                <div className="field" style={{ marginBottom: 0 }}><label className="field-label" style={{ fontSize: ".64rem", textTransform: "uppercase", letterSpacing: ".5px", marginBottom: 4 }}>💳 Thanh toán</label><select className="field-input" value={form.payment_method} onChange={e => upForm("payment_method", e.target.value)}><option value="TM/CK">TM/CK</option><option value="TM">Tiền mặt</option><option value="CK">Chuyển khoản</option><option value="Ví điện tử">Ví điện tử</option></select></div>
                            </div>
                        </div>
                    </div>

                    {/* Buyer */}
                    <div className="card card-glow fade-up" style={{ marginBottom: 14, animationDelay: ".03s" }}>
                        <div className="card-header" style={{ paddingBottom: 6 }}>
                            <span className="card-title" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <span style={{ width: 24, height: 24, borderRadius: 7, background: "linear-gradient(135deg,#3b82f6,#2563eb)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: ".6rem", color: "white", boxShadow: "0 2px 6px rgba(37,99,235,.3)" }}>👤</span>
                                Người mua
                            </span>
                            <span style={{ fontSize: ".64rem", color: "var(--text-tertiary)", fontStyle: "italic", background: "var(--bg-elevated)", padding: "3px 10px", borderRadius: 20 }}>Bỏ trống → khách lẻ</span>
                        </div>
                        <div className="card-body" style={{ paddingTop: 6 }}>
                            <div className="field"><label className="field-label">Họ tên</label><input className="field-input" placeholder="Nguyễn Văn A" value={form.buyer_name} onChange={e => upForm("buyer_name", e.target.value)} /></div>
                            <div className="field"><label className="field-label">Tên đơn vị</label><input className="field-input" placeholder="Công ty TNHH ABC" value={form.buyer_company} onChange={e => upForm("buyer_company", e.target.value)} /></div>
                            <div className="field-row" style={{ marginBottom: 0 }}>
                                <div className="field" style={{ marginBottom: 0 }}><label className="field-label">MST</label><input className="field-input" placeholder="0123456789" value={form.buyer_tax_id} onChange={e => upForm("buyer_tax_id", e.target.value)} style={{ fontFamily: "var(--font-mono)", letterSpacing: 1 }} /></div>
                                <div className="field" style={{ marginBottom: 0 }}><label className="field-label">Địa chỉ</label><input className="field-input" placeholder="Quận 1, TP.HCM" value={form.buyer_address} onChange={e => upForm("buyer_address", e.target.value)} /></div>
                            </div>
                        </div>
                    </div>

                    {/* Line items */}
                    <div className="card card-glow fade-up" style={{ marginBottom: 14, animationDelay: ".06s" }}>
                        <div className="card-header">
                            <span className="card-title" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <span style={{ width: 24, height: 24, borderRadius: 7, background: "linear-gradient(135deg,#8b5cf6,#6d28d9)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: ".6rem", color: "white", boxShadow: "0 2px 6px rgba(109,40,217,.3)" }}>📦</span>
                                Hàng hóa / Dịch vụ
                                <span style={{ fontFamily: "var(--font-mono)", fontSize: ".66rem", color: "var(--text-tertiary)", fontWeight: 400 }}>{form.items.length}</span>
                            </span>
                            <button style={{ padding: "5px 14px", fontSize: ".72rem", fontWeight: 700, fontFamily: "var(--font)", borderRadius: 20, border: "none", background: "linear-gradient(135deg,#8b5cf6,#6d28d9)", color: "white", cursor: "pointer", transition: "all .2s", display: "flex", alignItems: "center", gap: 4, boxShadow: "0 2px 8px rgba(109,40,217,.25)" }} onClick={addItem}
                                onMouseOver={e => { e.currentTarget.style.transform = "scale(1.04)" }} onMouseOut={e => { e.currentTarget.style.transform = "" }}>
                                <Icons.Plus /> Thêm
                            </button>
                        </div>
                        <div className="card-body" style={{ padding: "0 16px 14px" }}>
                            <div className="inv-item-header" style={{ display: "grid", gridTemplateColumns: "26px 1fr 64px 52px 1fr auto", gap: 6, padding: "8px 0 6px", fontSize: ".58rem", fontWeight: 700, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: ".5px", borderBottom: "2px solid var(--border)" }}>
                                <span></span><span>Tên hàng hóa</span><span style={{ textAlign: "center" }}>ĐVT</span><span style={{ textAlign: "center" }}>SL</span><span>Đơn giá</span><span style={{ textAlign: "right", paddingRight: 4, minWidth: 88 }}>Thành tiền</span>
                            </div>
                            {form.items.map((it, idx) => {
                                const lt = (it.qty || 0) * (it.price || 0); return (
                                    <div key={idx} className="inv-item-row" style={{ display: "grid", gridTemplateColumns: "26px 1fr 64px 52px 1fr auto", gap: 6, alignItems: "center", padding: "10px 0", borderBottom: idx < form.items.length - 1 ? "1px solid var(--border-light)" : "none" }}>
                                        <span style={{ fontWeight: 700, fontSize: ".66rem", color: "var(--text-tertiary)", textAlign: "center", width: 22, height: 22, borderRadius: 6, background: "var(--bg-elevated)", display: "flex", alignItems: "center", justifyContent: "center" }}>{idx + 1}</span>
                                        <input className="field-input" placeholder="Tên hàng hóa / dịch vụ" value={it.name} onChange={e => updateItem(idx, "name", e.target.value)} style={{ padding: "7px 10px", fontSize: ".83rem", margin: 0 }} />
                                        <input className="field-input" placeholder="Cái" value={it.unit} onChange={e => updateItem(idx, "unit", e.target.value)} style={{ padding: "7px 5px", fontSize: ".82rem", textAlign: "center", margin: 0 }} />
                                        <input className="field-input" type="number" min="1" value={it.qty || ""} onChange={e => updateItem(idx, "qty", parseInt(e.target.value) || 0)} style={{ padding: "7px 3px", fontSize: ".82rem", textAlign: "center", fontFamily: "var(--font-mono)", margin: 0 }} />
                                        <input className="field-input" type="number" min="0" placeholder="0" value={it.price || ""} onChange={e => updateItem(idx, "price", parseInt(e.target.value) || 0)} style={{ padding: "7px 10px", fontSize: ".82rem", fontFamily: "var(--font-mono)", margin: 0 }} />
                                        <div style={{ display: "flex", alignItems: "center", gap: 5, minWidth: 88 }}>
                                            <span style={{ fontWeight: 700, fontFamily: "var(--font-mono)", fontSize: ".82rem", color: lt > 0 ? "var(--accent)" : "var(--text-tertiary)", flex: 1, textAlign: "right" }}>{fmt(lt)}</span>
                                            {form.items.length > 1 && <button style={{ width: 20, height: 20, borderRadius: 5, border: "none", background: "transparent", color: "var(--red)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".6rem", flexShrink: 0, opacity: .4, transition: "all .15s" }} onClick={() => removeItem(idx)}
                                                onMouseOver={e => { e.currentTarget.style.background = "var(--red)"; e.currentTarget.style.color = "white"; e.currentTarget.style.opacity = "1" }} onMouseOut={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--red)"; e.currentTarget.style.opacity = ".4" }}>✕</button>}
                                        </div>
                                    </div>
                                )
                            })}
                            {/* Total */}
                            <div style={{ marginTop: 12, borderRadius: 12, background: "linear-gradient(135deg,rgba(99,102,241,.05),rgba(139,92,246,.03))", border: "1.5px solid rgba(99,102,241,.12)", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div>
                                    <div style={{ fontWeight: 800, fontSize: ".88rem", color: "var(--accent)" }}>Cộng tiền hàng</div>
                                    <div style={{ fontSize: ".68rem", color: "var(--text-tertiary)", fontStyle: "italic", marginTop: 3, maxWidth: 260, lineHeight: 1.4 }}>{numToVietnamese(total)}</div>
                                </div>
                                <span style={{ fontWeight: 800, fontFamily: "var(--font-mono)", fontSize: "1.45rem", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{fmtVND(total)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Note */}
                    <div className="card card-glow fade-up" style={{ animationDelay: ".09s" }}>
                        <div className="card-body" style={{ padding: "14px 20px" }}><div className="field" style={{ marginBottom: 0 }}><label className="field-label" style={{ fontSize: ".64rem", textTransform: "uppercase", letterSpacing: ".5px" }}>💬 Ghi chú</label><input className="field-input" placeholder="VD: Cảm ơn quý khách!" value={form.note} onChange={e => upForm("note", e.target.value)} /></div></div>
                    </div>
                </div>

                {/* RIGHT: Preview */}
                <div>
                    <div className="card card-glow fade-up" style={{ position: "sticky", top: 16, animationDelay: ".05s", overflow: "hidden" }}>
                        <div className="card-header" style={{ background: "linear-gradient(135deg,rgba(99,102,241,.03),transparent)" }}>
                            <span className="card-title" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <span style={{ width: 24, height: 24, borderRadius: 7, background: "linear-gradient(135deg,#10b981,#059669)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: ".6rem", color: "white", boxShadow: "0 2px 6px rgba(5,150,105,.3)" }}>👁</span>
                                Xem trước
                            </span>
                            <button className="btn btn-secondary" style={{ padding: "5px 14px", fontSize: ".72rem", gap: 4 }} onClick={printInvoice}><Icons.Print /> In</button>
                        </div>
                        <div className="card-body" style={{ padding: 10, overflow: "auto", maxHeight: "78vh", background: "linear-gradient(180deg,#e5e8ee,#dde0e8)", borderRadius: "0 0 var(--radius-lg) var(--radius-lg)" }}>
                            <div style={{ borderRadius: 6, overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,.12)" }}>
                                {renderInvoicePreview({ business, form, serial, invNumber, total, day, month, year, editingInv })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);

    // ═══ PREVIEW ═══
    if (view === "preview" && editingInv) return (<>
        <div className="page-header">
            <div><h1 className="page-title">{editingInv.serial}-{editingInv.number}</h1><p className="page-subtitle">{editingInv.buyer_company || editingInv.buyer_name || "Khách lẻ"} · {fmtDate(editingInv.date)} · {fmtVND(editingInv.total)}</p></div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button className="btn btn-secondary" onClick={() => setView("list")} style={{ gap: 6 }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6" /></svg> DS</button>
                <button className="btn btn-secondary" onClick={() => editInv(editingInv)} style={{ gap: 6 }}><Icons.Edit /> Sửa</button>
                <button className="btn btn-secondary" onClick={printInvoice} style={{ gap: 6 }}><Icons.Print /> In</button>
                <button className="btn btn-secondary" onClick={() => setDeleteConfirm(editingInv)} style={{ gap: 6, color: "var(--red)", borderColor: "rgba(239,68,68,.3)" }}><Icons.Trash /> Xóa</button>
                {editingInv.status === "draft" && <button className="btn btn-primary" style={{ gap: 6, background: "linear-gradient(135deg,#10b981,#059669)", boxShadow: "0 4px 14px rgba(16,185,129,.25)" }} onClick={() => {
                    setInvoices(p => p.map(x => x.id === editingInv.id ? { ...x, status: "sent" } : x));
                    setEditingInv(prev => ({ ...prev, status: "sent" })); addToast({ type: "success", title: "Đã đánh dấu gửi" });
                }}><Icons.Check /> Đánh dấu đã gửi</button>}
            </div>
        </div>
        <div className="page-body">
            <div style={{ maxWidth: 680, margin: "0 auto", borderRadius: 10, overflow: "hidden", boxShadow: "0 8px 40px rgba(0,0,0,.12),0 2px 8px rgba(0,0,0,.06)" }}>
                {renderInvoicePreview({ business: editingInv.seller ? { ...business, ...editingInv.seller, inv_logo: editingInv.seller.logo } : business, form, serial: editingInv.serial, invNumber: editingInv.number, total: editingInv.total, day: new Date(editingInv.date + "T00:00:00").getDate(), month: new Date(editingInv.date + "T00:00:00").getMonth() + 1, year: new Date(editingInv.date + "T00:00:00").getFullYear(), editingInv })}
            </div>
            {deleteConfirm && (
                <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}><div className="modal card-glow" onClick={e => e.stopPropagation()} style={{ maxWidth: 420 }}>
                    <div className="modal-header"><h2 className="modal-title">Xóa hóa đơn?</h2><button className="modal-close" onClick={() => setDeleteConfirm(null)}><Icons.X /></button></div>
                    <div className="modal-body">
                        <p style={{ fontSize: ".88rem", color: "var(--text-secondary)", marginBottom: 16 }}>Bạn có chắc muốn xóa hóa đơn <b>{deleteConfirm.serial}-{deleteConfirm.number}</b>? Thao tác này không thể hoàn tác.</p>
                        <div style={{ display: "flex", gap: 10 }}>
                            <button className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }} onClick={() => setDeleteConfirm(null)}>Hủy</button>
                            <button className="btn btn-primary" style={{ flex: 1, justifyContent: "center", background: "var(--red)", boxShadow: "0 4px 14px rgba(217,64,64,.25)" }} onClick={() => deleteInvoice(deleteConfirm)}>Xóa</button>
                        </div>
                    </div>
                </div></div>
            )}
        </div>
    </>);
    return null;
}

// ── Invoice Preview Renderer — Professional print-ready template ──
function renderInvoicePreview({ business, form, serial, invNumber, total, day, month, year, editingInv }) {
    const totalWords = numToVietnamese(total);
    const hasItems = form.items.filter(it => it.name).length > 0;
    const status = editingInv?.status;
    const hc = "#1a3a5c"; // header color
    return (
        <div id="invoice-preview-print" style={{ fontFamily: "'Times New Roman',Georgia,serif", color: "#1a1a2e", background: "#fff", fontSize: "10.5pt", lineHeight: 1.5, position: "relative", overflow: "hidden" }}>
            {/* Watermark */}
            {status === "draft" && <div style={{ position: "absolute", top: "38%", left: "50%", transform: "translate(-50%,-50%) rotate(-28deg)", fontSize: "56pt", fontWeight: 900, color: "rgba(200,50,50,.05)", letterSpacing: 8, whiteSpace: "nowrap", pointerEvents: "none", zIndex: 1 }}>NHÁP</div>}

            {/* Header band */}
            <div className="inv-header-band" style={{ background: `linear-gradient(135deg,${hc} 0%,#2d6a9f 60%,#3a8fd4 100%)`, padding: "20px 26px 18px", display: "flex", gap: 16, alignItems: "center" }}>
                {business.inv_logo ? (
                    <div style={{ width: 56, height: 56, borderRadius: 10, background: "white", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, overflow: "hidden", boxShadow: "0 2px 10px rgba(0,0,0,.2)" }}>
                        <img src={business.inv_logo} alt="" style={{ width: 48, height: 48, objectFit: "contain" }} />
                    </div>
                ) : (
                    <div style={{ width: 56, height: 56, borderRadius: 10, background: "rgba(255,255,255,.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "1.4rem" }}>🏪</div>
                )}
                <div style={{ flex: 1, color: "white" }}>
                    <div style={{ fontWeight: 700, fontSize: "12.5pt", textTransform: "uppercase", letterSpacing: 1, marginBottom: 3, textShadow: "0 1px 3px rgba(0,0,0,.15)" }}>{business.name || "TÊN HỘ KINH DOANH"}</div>
                    <div style={{ fontSize: "8.5pt", opacity: .88, lineHeight: 1.7 }}>
                        <div>{business.address || "Địa chỉ: ............"}</div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                            <span>MST: <b style={{ letterSpacing: 1 }}>{business.tax_id || "..."}</b></span>
                            {business.inv_phone && <span>· ĐT: {business.inv_phone}</span>}
                            {business.inv_email && <span>· Email: {business.inv_email}</span>}
                        </div>
                        {business.inv_bank_account && <div>TK: {business.inv_bank_account} — {business.inv_bank_name || ""}</div>}
                    </div>
                </div>
            </div>

            {/* Body */}
            <div style={{ padding: "16px 26px 22px" }}>
                {/* Title */}
                <div style={{ textAlign: "center", margin: "8px 0 4px" }}>
                    <div style={{ fontSize: "17pt", fontWeight: "bold", color: hc, letterSpacing: 3, textTransform: "uppercase" }}>Hóa đơn bán hàng</div>
                    <div style={{ fontSize: "8.5pt", fontStyle: "italic", color: "#888", marginTop: 1 }}>(Bản thể hiện của hóa đơn điện tử)</div>
                    <div style={{ fontSize: "10pt", marginTop: 6, color: "#444" }}>Ngày {String(day).padStart(2, "0")} tháng {String(month).padStart(2, "0")} năm {year}</div>
                </div>

                {/* Serial pills */}
                <div style={{ display: "flex", justifyContent: "center", gap: 18, margin: "10px 0 16px" }}>
                    <span style={{ display: "inline-block", padding: "4px 16px", borderRadius: 4, background: "#f0f4f8", border: "1px solid #d0d8e0", fontSize: "9.5pt" }}>Ký hiệu: <b style={{ color: hc, letterSpacing: 1 }}>{serial}</b></span>
                    <span style={{ display: "inline-block", padding: "4px 16px", borderRadius: 4, background: "#fff7ed", border: "1px solid #fed7aa", fontSize: "9.5pt" }}>Số: <b style={{ color: "#c2410c", letterSpacing: 1 }}>{editingInv?.number || invNumber}</b></span>
                </div>

                {/* Buyer */}
                <div style={{ fontSize: "10pt", marginBottom: 16, lineHeight: 1.85, padding: "12px 16px", background: "#fafbfc", borderRadius: 6, border: "1px solid #eef1f5" }}>
                    <div>Họ tên người mua hàng: <b>{form.buyer_name || <span style={{ color: "#ccc" }}>..........................................</span>}</b></div>
                    <div>Tên đơn vị: {form.buyer_company || <span style={{ color: "#ccc" }}>................................................................</span>}</div>
                    <div>MST: <b style={{ letterSpacing: 2, fontFamily: "'Courier New',monospace", color: hc }}>{form.buyer_tax_id || <span style={{ color: "#ccc", letterSpacing: 0, fontFamily: "inherit" }}>................</span>}</b></div>
                    <div>Địa chỉ: {form.buyer_address || <span style={{ color: "#ccc" }}>................................................................</span>}</div>
                    <div>Hình thức thanh toán: <b>{form.payment_method || "TM/CK"}</b></div>
                </div>

                {/* Table */}
                <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 12 }}>
                    <thead>
                        <tr>{["STT", "Tên hàng hóa, dịch vụ", "ĐVT", "Số lượng", "Đơn giá", "Thành tiền"].map((h, i) => (
                            <th key={i} style={{ background: hc, color: "white", border: `1px solid ${hc}`, padding: "8px " + (i === 1 ? "10px" : "6px"), fontSize: "9pt", fontWeight: 700, textAlign: "center", width: i === 0 ? 32 : i === 2 ? 48 : i === 3 ? 52 : i === 4 ? 86 : i === 5 ? 100 : undefined }}>{h}</th>
                        ))}</tr>
                        <tr>{["1", "2", "3", "4", "5", "6=4×5"].map((c, i) => (
                            <td key={i} style={{ textAlign: "center", padding: "3px", fontSize: "7.5pt", fontStyle: "italic", color: "#999", border: "1px solid #e2e6ea", background: "#f8f9fb" }}>{c}</td>
                        ))}</tr>
                    </thead>
                    <tbody>
                        {form.items.filter(it => it.name).map((it, idx) => (
                            <tr key={idx} style={{ background: idx % 2 === 0 ? "#fff" : "#f8fafb" }}>
                                <td style={{ textAlign: "center", border: "1px solid #dde2e8", padding: "7px 6px", color: "#666" }}>{idx + 1}</td>
                                <td style={{ border: "1px solid #dde2e8", padding: "7px 10px" }}>{it.name}</td>
                                <td style={{ textAlign: "center", border: "1px solid #dde2e8", padding: "7px 4px", color: "#666" }}>{it.unit || ""}</td>
                                <td style={{ textAlign: "right", border: "1px solid #dde2e8", padding: "7px 8px", fontFamily: "'Courier New',monospace" }}>{fmt(it.qty || 0)}</td>
                                <td style={{ textAlign: "right", border: "1px solid #dde2e8", padding: "7px 8px", fontFamily: "'Courier New',monospace" }}>{fmt(it.price || 0)}</td>
                                <td style={{ textAlign: "right", border: "1px solid #dde2e8", padding: "7px 8px", fontWeight: "bold", fontFamily: "'Courier New',monospace", color: hc }}>{fmt((it.qty || 0) * (it.price || 0))}</td>
                            </tr>
                        ))}
                        {!hasItems && <tr><td colSpan={6} style={{ textAlign: "center", border: "1px solid #dde2e8", color: "#ccc", fontStyle: "italic", padding: 24 }}>Chưa có hàng hóa</td></tr>}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={5} style={{ fontWeight: "bold", textAlign: "right", paddingRight: 14, border: "1px solid #c0c8d0", background: "#f0f4f8", color: hc, fontSize: "10.5pt", padding: "9px 14px 9px 10px" }}>CỘNG TIỀN HÀNG</td>
                            <td style={{ fontWeight: "bold", textAlign: "right", border: "1px solid #c0c8d0", background: "#f0f4f8", fontSize: "12pt", fontFamily: "'Courier New',monospace", color: hc, padding: "9px 8px" }}>{fmt(total)}</td>
                        </tr>
                    </tfoot>
                </table>

                {/* Amount words */}
                <div style={{ fontSize: "9.5pt", margin: "10px 0 14px", padding: "8px 14px", background: "#f8fafb", borderLeft: `3px solid #2d6a9f`, borderRadius: "0 4px 4px 0" }}>
                    <span style={{ fontWeight: "bold", color: hc }}>Số tiền viết bằng chữ: </span>
                    <span style={{ fontStyle: "italic", color: "#333" }}>{totalWords}</span>
                </div>

                {form.note && <div style={{ fontSize: "9pt", fontStyle: "italic", marginBottom: 14, color: "#666", paddingTop: 6, borderTop: "1px dashed #e0e4e8" }}>Ghi chú: {form.note}</div>}

                {/* Signatures */}
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 22, textAlign: "center", fontSize: "10pt" }}>
                    <div style={{ width: "42%" }}>
                        <div style={{ fontWeight: "bold", color: hc, marginBottom: 2 }}>Người mua hàng</div>
                        <div style={{ fontSize: "7.5pt", fontStyle: "italic", color: "#999" }}>(Ký, ghi rõ họ tên)</div>
                        <div style={{ minHeight: 55 }} /><div style={{ fontWeight: 600, color: "#333" }}>{form.buyer_name || ""}</div>
                    </div>
                    <div style={{ width: "42%" }}>
                        <div style={{ fontWeight: "bold", color: hc, marginBottom: 2 }}>Người bán hàng</div>
                        <div style={{ fontSize: "7.5pt", fontStyle: "italic", color: "#999" }}>(Ký, đóng dấu, ghi rõ họ tên)</div>
                        <div style={{ minHeight: 55 }} /><div style={{ fontWeight: 600, color: "#333" }}>{business.name || ""}</div>
                    </div>
                </div>

                {/* Footer */}
                <div style={{ marginTop: 16, paddingTop: 10, borderTop: "1px dashed #d0d8e0", fontSize: "7.5pt", color: "#aaa", textAlign: "center", display: "flex", justifyContent: "space-between" }}>
                    <span>(Cần kiểm tra, đối chiếu khi lập, giao, nhận hóa đơn)</span>
                    <span style={{ fontFamily: "'Courier New',monospace", letterSpacing: .5 }}>HKD Tax 2026</span>
                </div>
            </div>
        </div>
    );
}


// ═══════════════════════════════════════════════════════════════════════════════
// SETTINGS PAGE — Full profile & tax configuration
// ═══════════════════════════════════════════════════════════════════════════════
function SettingsPage({ business, onUpdate, addToast }) {
    const [edit, setEdit] = useState({ ...business });
    const [dirty, setDirty] = useState(false);
    // Sync edit state when business prop changes externally (e.g. inv_counter increment from InvoicePage)
    useEffect(() => {
        setEdit(prev => {
            // Merge business changes but keep local dirty edits
            const merged = { ...business };
            // If user has unsaved changes, keep them
            if (dirty) {
                Object.keys(prev).forEach(k => { if (prev[k] !== business[k] && k !== "inv_counter") merged[k] = prev[k] });
            }
            return merged;
        });
    }, [business]);
    const up = (k, v) => { setEdit(p => ({ ...p, [k]: v })); setDirty(true) };
    // Direct save for logo — persists immediately without waiting for "Lưu"
    const upAndSave = (k, v) => {
        setEdit(p => { const next = { ...p, [k]: v }; return next });
        onUpdate(prev => ({ ...prev, [k]: v }));
        setDirty(false);
    };
    const canRevPct = edit.revenue_tier === "500m_3b";
    const showPit = edit.revenue_tier === "500m_3b" || edit.revenue_tier === "over_3b";
    const vatG = VAT_GROUPS.find(g => g.id === edit.default_vat_group);
    const tierLabels = { under_500m: "Dưới 500 triệu/năm", ["500m_3b"]: "500 triệu — 3 tỷ/năm", over_3b: "Trên 3 tỷ/năm" };
    const handleSave = () => {
        if (edit.revenue_tier === "over_3b" && edit.pit_method === "REVENUE_PERCENT") { up("pit_method", "PROFIT"); return }
        const annEst = edit.revenue_tier === "under_500m" ? 400000000 : edit.revenue_tier === "500m_3b" ? 600000000 : 4000000000;
        // Use callback to get latest state, merged with current edit
        onUpdate(prev => ({ ...prev, ...edit, annual_revenue_estimate: annEst })); setDirty(false);
        addToast({ type: "success", title: "Đã lưu cài đặt", detail: "Cấu hình thuế và hồ sơ đã được cập nhật" });
    };

    return (<>
        <div className="page-header"><div><h1 className="page-title">Cài đặt</h1><p className="page-subtitle">Hồ sơ hộ kinh doanh & cấu hình thuế 2026</p></div>
            {dirty && <button className="btn btn-primary" onClick={handleSave}><Icons.Check /> Lưu thay đổi</button>}
        </div>
        <div className="page-body">
            {/* ── Business Profile ── */}
            <div className="card card-glow fade-up" style={{ marginBottom: 24 }}>
                <div className="card-header"><span className="card-title">Hồ sơ hộ kinh doanh</span></div>
                <div className="card-body">
                    <div className="field"><label className="field-label">Tên hộ kinh doanh / cửa hàng</label>
                        <input className="field-input" value={edit.name} onChange={e => up("name", e.target.value)} style={{ fontSize: "1.05rem", padding: "14px 18px" }} />
                    </div>
                    <div className="field-row">
                        <div className="field"><label className="field-label">Mã số thuế</label><input className="field-input" value={edit.tax_id} onChange={e => up("tax_id", e.target.value)} style={{ fontFamily: "var(--font-mono)" }} /></div>
                        <div className="field"><label className="field-label">Địa chỉ</label><input className="field-input" value={edit.address || ""} onChange={e => up("address", e.target.value)} /></div>
                    </div>
                </div>
            </div>

            {/* ── Revenue Tier = Tax Gate ── */}
            <div className="card card-glow fade-up" style={{ marginBottom: 24, animationDelay: ".05s" }}>
                <div className="card-header">
                    <div><span className="card-title">Ngưỡng doanh thu</span><div style={{ fontSize: ".72rem", color: "var(--text-tertiary)", marginTop: 2 }}>Quyết định VAT/PIT và loại sổ sách</div></div>
                    <span style={{ background: edit.revenue_tier === "under_500m" ? "var(--green-light)" : "var(--accent-light)", color: edit.revenue_tier === "under_500m" ? "var(--green)" : "var(--accent)", padding: "4px 12px", borderRadius: "var(--radius-full)", fontSize: ".72rem", fontWeight: 600 }}>
                        {edit.revenue_tier === "under_500m" ? "Miễn thuế" : "Phải kê khai"}
                    </span>
                </div>
                <div className="card-body">
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        {[
                            { id: "under_500m", label: "Dưới 500 triệu/năm", desc: "Không chịu VAT, không nộp PIT. Chỉ cần Sổ S1a.", color: "var(--green)", bg: "var(--green-light)" },
                            { id: "500m_3b", label: "500 triệu — 3 tỷ/năm", desc: "Kê khai VAT theo nhóm + PIT (2 cách tính). Sổ S2b–S2e.", color: "var(--accent)", bg: "var(--accent-light)" },
                            { id: "over_3b", label: "Trên 3 tỷ/năm", desc: "Kê khai chi tiết. PIT theo lợi nhuận bắt buộc. Sổ S2b–S2e.", color: "var(--blue)", bg: "var(--blue-light)" },
                        ].map(o => (<div key={o.id} onClick={() => { up("revenue_tier", o.id); if (o.id === "under_500m") up("pit_method", ""); if (o.id === "over_3b") up("pit_method", "PROFIT") }} style={{ display: "flex", gap: 14, padding: "16px 18px", borderRadius: "var(--radius-md)", border: `2px solid ${edit.revenue_tier === o.id ? o.color : "var(--border)"}`, background: edit.revenue_tier === o.id ? o.bg : "var(--bg-card)", cursor: "pointer", transition: "all .15s", alignItems: "center" }}>
                            <div style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${edit.revenue_tier === o.id ? o.color : "var(--border)"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                {edit.revenue_tier === o.id && <div style={{ width: 10, height: 10, borderRadius: "50%", background: o.color }} />}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 600, fontSize: ".92rem" }}>{o.label}</div>
                                <div style={{ fontSize: ".78rem", color: "var(--text-tertiary)", marginTop: 2 }}>{o.desc}</div>
                            </div>
                        </div>))}
                    </div>
                    <div style={{ padding: "10px 14px", background: "var(--yellow-light)", borderRadius: "var(--radius-sm)", fontSize: ".75rem", color: "var(--yellow)", fontWeight: 500, marginTop: 12 }}>
                        ⚠ Ngưỡng 500 triệu/năm (Luật 109/2025/QH15): vượt qua = phải kê khai VAT + PIT
                    </div>
                </div>
            </div>

            {/* ── VAT Group ── */}
            <div className="card card-glow fade-up" style={{ marginBottom: 24, animationDelay: ".1s" }}>
                <div className="card-header">
                    <div><span className="card-title">Nhóm ngành VAT</span><div style={{ fontSize: ".72rem", color: "var(--text-tertiary)", marginTop: 2 }}>Tỷ lệ VAT trên doanh thu theo TT69/2025/TT-BTC</div></div>
                    {vatG && <span style={{ fontFamily: "var(--font-mono)", fontSize: ".85rem", fontWeight: 700, color: "var(--accent)" }}>{vatG.rateLabel}</span>}
                </div>
                <div className="card-body">
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                        {VAT_GROUPS.map(g => (<div key={g.id} onClick={() => up("default_vat_group", g.id)} style={{ padding: "18px 16px", borderRadius: "var(--radius-md)", border: `2px solid ${edit.default_vat_group === g.id ? "var(--accent)" : "var(--border)"}`, background: edit.default_vat_group === g.id ? "var(--accent-light)" : "var(--bg-card)", cursor: "pointer", transition: "all .15s", textAlign: "center" }}>
                            <div style={{ fontSize: "1.6rem", marginBottom: 6 }}>{g.icon}</div>
                            <div style={{ fontWeight: 600, fontSize: ".85rem" }}>{g.label}</div>
                            <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 6 }}>
                                <span style={{ padding: "2px 8px", borderRadius: "var(--radius-full)", fontSize: ".68rem", fontWeight: 700, background: edit.default_vat_group === g.id ? "var(--accent)" : "var(--bg-elevated)", color: edit.default_vat_group === g.id ? "white" : "var(--text-tertiary)" }}>VAT {g.rateLabel}</span>
                                <span style={{ padding: "2px 8px", borderRadius: "var(--radius-full)", fontSize: ".68rem", fontWeight: 700, background: edit.default_vat_group === g.id ? "var(--blue)" : "var(--bg-elevated)", color: edit.default_vat_group === g.id ? "white" : "var(--text-tertiary)" }}>PIT {(g.pitRevPct * 100)}%</span>
                            </div>
                        </div>))}
                    </div>
                </div>
            </div>

            {/* ── PIT Method ── */}
            {showPit && (
                <div className="card card-glow fade-up" style={{ marginBottom: 24, animationDelay: ".15s" }}>
                    <div className="card-header">
                        <div><span className="card-title">Phương pháp tính PIT</span><div style={{ fontSize: ".72rem", color: "var(--text-tertiary)", marginTop: 2 }}>Thuế TNCN kinh doanh — Luật 109/2025/QH15</div></div>
                        <span style={{ background: "var(--blue-light)", color: "var(--blue)", padding: "4px 12px", borderRadius: "var(--radius-full)", fontSize: ".72rem", fontWeight: 600 }}>
                            {edit.pit_method === "PROFIT" ? "Theo lợi nhuận" : "Theo % doanh thu"}
                        </span>
                    </div>
                    <div className="card-body">
                        <div className={`pit-method-card ${edit.pit_method === "PROFIT" ? "active" : ""}`} onClick={() => up("pit_method", "PROFIT")} style={{ marginBottom: 12 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                    <div style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${edit.pit_method === "PROFIT" ? "var(--blue)" : "var(--border)"}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        {edit.pit_method === "PROFIT" && <div style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--blue)" }} />}
                                    </div>
                                    <span style={{ fontWeight: 700, fontSize: ".92rem" }}>Theo lợi nhuận</span>
                                </div>
                                <span style={{ fontFamily: "var(--font-mono)", fontSize: ".72rem", color: "var(--blue)" }}>15–20%</span>
                            </div>
                            <div style={{ fontSize: ".78rem", color: "var(--text-secondary)", paddingLeft: 30 }}>PIT = (Doanh thu − Chi phí hợp lệ) × thuế suất theo bậc doanh thu.</div>
                            <div style={{ fontSize: ".72rem", color: "var(--text-tertiary)", paddingLeft: 30, marginTop: 4, fontFamily: "var(--font-mono)" }}>≤3T: 15% · 3–50T: 17% · &gt;50T: 20%</div>
                        </div>
                        <div className={`pit-method-card ${edit.pit_method === "REVENUE_PERCENT" ? "active" : ""} ${!canRevPct ? "ledger-disabled" : ""}`} onClick={() => canRevPct && up("pit_method", "REVENUE_PERCENT")}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                    <div style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${edit.pit_method === "REVENUE_PERCENT" ? "var(--blue)" : "var(--border)"}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        {edit.pit_method === "REVENUE_PERCENT" && <div style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--blue)" }} />}
                                    </div>
                                    <span style={{ fontWeight: 700, fontSize: ".92rem" }}>Theo % doanh thu</span>
                                </div>
                                <span style={{ fontFamily: "var(--font-mono)", fontSize: ".72rem", color: "var(--accent)" }}>0.5–5%</span>
                            </div>
                            <div style={{ fontSize: ".78rem", color: "var(--text-secondary)", paddingLeft: 30 }}>PIT = tỷ lệ % trên phần doanh thu vượt 500 triệu. Đơn giản hơn.</div>
                            {!canRevPct && <div style={{ fontSize: ".72rem", color: "var(--red)", paddingLeft: 30, marginTop: 4 }}>⚠ Không khả dụng — chỉ cho doanh thu 500M–3 tỷ</div>}
                        </div>
                    </div>
                </div>
            )}

            {/* ── Feature Toggles ── */}
            <div className="card card-glow fade-up" style={{ marginBottom: 24, animationDelay: ".2s" }}>
                <div className="card-header"><span className="card-title">Tính năng nâng cao</span></div>
                <div className="card-body">
                    <div className="field-toggle-row" style={{ borderBottom: "1px solid var(--border-light)", paddingBottom: 14, marginBottom: 14 }}>
                        <div><div style={{ fontWeight: 600, fontSize: ".88rem" }}>Theo dõi tồn kho (Sổ S2d)</div><div style={{ fontSize: ".72rem", color: "var(--text-tertiary)", marginTop: 2 }}>Bật nếu bạn cần quản lý nhập/xuất kho</div></div>
                        <button className={`toggle ${edit.track_inventory ? "on" : ""}`} onClick={() => up("track_inventory", !edit.track_inventory)} />
                    </div>
                    <div className="field-toggle-row">
                        <div><div style={{ fontWeight: 600, fontSize: ".88rem" }}>Theo dõi dòng tiền (Sổ S2e)</div><div style={{ fontSize: ".72rem", color: "var(--text-tertiary)", marginTop: 2 }}>Sổ quỹ tiền mặt + ngân hàng + ví điện tử</div></div>
                        <button className={`toggle ${edit.track_cash ? "on" : ""}`} onClick={() => up("track_cash", !edit.track_cash)} />
                    </div>
                </div>
            </div>

            {/* ── Invoice Config ── */}
            <div className="card card-glow fade-up" style={{ marginBottom: 24, animationDelay: ".22s" }}>
                <div className="card-header">
                    <div><span className="card-title">Cài đặt hóa đơn</span><div style={{ fontSize: ".72rem", color: "var(--text-tertiary)", marginTop: 2 }}>Thông tin hiển thị trên hóa đơn bán hàng</div></div>
                    <span style={{ background: "var(--blue-light)", color: "var(--blue)", padding: "4px 12px", borderRadius: "var(--radius-full)", fontSize: ".68rem", fontWeight: 700 }}>HÓA ĐƠN</span>
                </div>
                <div className="card-body">
                    {/* Logo */}
                    <div className="field" style={{ marginBottom: 16 }}>
                        <label className="field-label">Logo hộ kinh doanh</label>
                        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                            {edit.inv_logo ? (
                                <div style={{ position: "relative" }}>
                                    <img src={edit.inv_logo} alt="Logo" style={{ width: 80, height: 80, objectFit: "contain", borderRadius: "var(--radius-md)", border: "1px solid var(--border)" }} />
                                    <button style={{ position: "absolute", top: -6, right: -6, width: 20, height: 20, borderRadius: "50%", background: "var(--red)", color: "white", border: "none", fontSize: ".7rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => { upAndSave("inv_logo", null); addToast({ type: "success", title: "Đã xóa logo" }) }}>✕</button>
                                </div>
                            ) : (
                                <div style={{ width: 80, height: 80, border: "2px dashed var(--border)", borderRadius: "var(--radius-md)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all .15s", fontSize: ".7rem", color: "var(--text-tertiary)" }}
                                    onClick={() => {
                                        const inp = document.createElement("input"); inp.type = "file"; inp.accept = "image/*"; inp.onchange = async (ev) => {
                                            const f = ev.target.files?.[0]; if (!f) return;
                                            const r = new FileReader(); r.onload = (e) => {
                                                const img = new Image(); img.onload = () => {
                                                    const c = document.createElement("canvas"); const mx = 200; const sc = Math.min(mx / img.width, mx / img.height, 1);
                                                    c.width = img.width * sc; c.height = img.height * sc; const ctx = c.getContext("2d"); ctx.drawImage(img, 0, 0, c.width, c.height);
                                                    upAndSave("inv_logo", c.toDataURL("image/png", 0.9));
                                                    addToast({ type: "success", title: "Đã cập nhật logo", detail: "Logo sẽ hiển thị trên hóa đơn" });
                                                }; img.src = e.target.result;
                                            }; r.readAsDataURL(f);
                                        }; inp.click()
                                    }}>
                                    <Icons.Upload />
                                    <span style={{ marginTop: 4 }}>Tải logo</span>
                                </div>
                            )}
                            <div style={{ flex: 1, fontSize: ".78rem", color: "var(--text-tertiary)", lineHeight: 1.6 }}>
                                Logo sẽ hiển thị ở góc trái trên hóa đơn. Khuyên dùng ảnh vuông, nền trắng hoặc trong suốt (PNG). Tự động resize ≤200px.
                            </div>
                        </div>
                    </div>
                    {/* Contact */}
                    <div className="field-row">
                        <div className="field"><label className="field-label">Số điện thoại</label><input className="field-input" placeholder="0901 234 567" value={edit.inv_phone || ""} onChange={e => up("inv_phone", e.target.value)} /></div>
                        <div className="field"><label className="field-label">Email</label><input className="field-input" placeholder="hkd@email.com" value={edit.inv_email || ""} onChange={e => up("inv_email", e.target.value)} /></div>
                    </div>
                    {/* Bank */}
                    <div className="field-row">
                        <div className="field"><label className="field-label">Số tài khoản ngân hàng</label><input className="field-input" placeholder="9012345678" value={edit.inv_bank_account || ""} onChange={e => up("inv_bank_account", e.target.value)} style={{ fontFamily: "var(--font-mono)" }} /></div>
                        <div className="field"><label className="field-label">Tên ngân hàng</label><input className="field-input" placeholder="Vietcombank CN HCM" value={edit.inv_bank_name || ""} onChange={e => up("inv_bank_name", e.target.value)} /></div>
                    </div>
                    {/* Serial / Counter */}
                    <div className="field-row">
                        <div className="field"><label className="field-label">Ký hiệu hóa đơn</label><input className="field-input" placeholder="2C26THH" value={edit.inv_serial || ""} onChange={e => up("inv_serial", e.target.value)} style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }} /><div className="field-hint">NĐ123: 2=bán hàng, C=gốc, 26=năm, T=HKD đăng ký CQT, HH=tự đặt</div></div>
                        <div className="field"><label className="field-label">Số HĐ tiếp theo</label><input className="field-input" type="number" min="1" value={edit.inv_counter || 1} onChange={e => up("inv_counter", parseInt(e.target.value) || 1)} style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }} /></div>
                    </div>
                    {/* Note */}
                    <div className="field"><label className="field-label">Ghi chú mặc định trên HĐ</label><input className="field-input" placeholder="VD: Cảm ơn quý khách!" value={edit.inv_note || ""} onChange={e => up("inv_note", e.target.value)} /></div>
                </div>
            </div>

            {/* ── Legal Summary ── */}
            <div className="card card-glow fade-up" style={{ animationDelay: ".25s" }}>
                <div className="card-header"><span className="card-title">Tóm tắt pháp lý áp dụng</span><span style={{ background: "var(--green-light)", color: "var(--green)", padding: "4px 12px", borderRadius: "var(--radius-full)", fontSize: ".7rem", fontWeight: 600 }}>2026</span></div>
                <div className="card-body" style={{ padding: "16px 24px" }}>
                    {[
                        { icon: "🚫", label: "Thuế khoán", value: "Đã bỏ từ 01/01/2026", color: "var(--green)" },
                        { icon: "🚫", label: "Lệ phí môn bài", value: "Đã bỏ từ 01/01/2026", color: "var(--green)" },
                        { icon: "📊", label: "Ngưỡng VAT/PIT", value: `${edit.revenue_tier === "under_500m" ? "≤ 500M → Miễn thuế" : "Doanh thu > 500M → Phải kê khai"}`, color: edit.revenue_tier === "under_500m" ? "var(--green)" : "var(--accent)" },
                        { icon: "📋", label: "Sổ kế toán", value: `TT152/2025 — ${edit.revenue_tier === "under_500m" ? "S1a" : "S2b, S2c" + (edit.track_inventory ? ", S2d" : "") + (edit.track_cash ? ", S2e" : "")}`, color: "var(--blue)" },
                        { icon: "💰", label: "VAT nhóm ngành", value: `TT69/2025 — ${vatG?.label || "Chưa chọn"} (${vatG?.rateLabel || "?"})`, color: "var(--accent)" },
                        { icon: "📈", label: "PIT kinh doanh", value: edit.revenue_tier === "under_500m" ? "Miễn" : `Luật 109/2025 — ${edit.pit_method === "PROFIT" ? "Theo lợi nhuận (15–20%)" : "Theo % doanh thu vượt 500M"}`, color: "var(--blue)" },
                    ].map((item, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 0", borderBottom: i < 5 ? "1px solid var(--border-light)" : "none" }}>
                            <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>{item.icon}</span>
                            <div style={{ flex: 1 }}><span style={{ fontWeight: 600, fontSize: ".85rem" }}>{item.label}</span></div>
                            <span style={{ fontSize: ".82rem", fontWeight: 600, color: item.color, textAlign: "right" }}>{item.value}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Save button bottom */}
            {dirty && (
                <div style={{ marginTop: 24, display: "flex", justifyContent: "flex-end" }} className="fade-up">
                    <button className="btn btn-primary btn-lg" onClick={handleSave}><Icons.Check /> Lưu thay đổi</button>
                </div>
            )}
        </div>
    </>);
}

// ═══════════════════════════════════════════════════════════════════════════════
// SETUP PAGE — Wallets / Categories management
// ═══════════════════════════════════════════════════════════════════════════════
function SetupPage({ categories, setCategories, wallets, setWallets, addToast, transactions, inventory, business, setTransactions, setInventory, setBusiness, invoices, setInvoices }) {
    const [tab, setTab] = useState("wallets"); // wallets | income | expense | backup
    const [showAdd, setShowAdd] = useState(false);
    const [newName, setNewName] = useState("");
    const [newIcon, setNewIcon] = useState("📝");
    const [newWalletType, setNewWalletType] = useState("bank");
    const [editId, setEditId] = useState(null);
    const [editName, setEditName] = useState("");
    const [editIcon, setEditIcon] = useState("");
    const [editS2cGroup, setEditS2cGroup] = useState("e");
    const [newS2cGroup, setNewS2cGroup] = useState("e");
    const [exporting, setExporting] = useState(false);
    const [importing, setImporting] = useState(false);
    const [importPreview, setImportPreview] = useState(null); // preview data before confirm
    const importFileRef = useRef(null);

    const handleAdd = () => {
        if (!newName.trim()) return;
        if (tab === "wallets") {
            const w = { id: "w" + Date.now(), name: newName.trim(), icon: newIcon, type: newWalletType };
            setWallets(p => [...p, w]);
            addToast({ type: "success", title: "Đã thêm ví", detail: w.icon + " " + w.name });
        } else {
            const cat = { id: "c" + Date.now(), name: newName.trim(), icon: newIcon, ...(tab === "expense" ? { s2c_group: newS2cGroup } : {}) };
            setCategories(p => ({ ...p, [tab]: [...p[tab], cat] }));
            const grp = tab === "expense" ? S2C_GROUPS.find(g => g.code === newS2cGroup) : null;
            addToast({ type: "success", title: "Đã thêm danh mục", detail: `${cat.icon} ${cat.name}${grp ? ` → Nhóm ${grp.code}) ${grp.shortLabel}` : ""}` });
        }
        setNewName(""); setNewIcon("📝"); setNewS2cGroup("e"); setShowAdd(false);
    };

    const handleDelete = (id) => {
        if (tab === "wallets") {
            if (wallets.length <= 1) { addToast({ type: "warning", title: "Không thể xóa", detail: "Cần ít nhất 1 phương thức thanh toán" }); return }
            setWallets(p => p.filter(w => w.id !== id));
        } else {
            setCategories(p => ({ ...p, [tab]: p[tab].filter(c => c.id !== id) }));
        }
        addToast({ type: "success", title: "Đã xóa" });
    };

    const handleSaveEdit = () => {
        if (!editName.trim() || !editId) return;
        if (tab === "wallets") {
            setWallets(p => p.map(w => w.id === editId ? { ...w, name: editName.trim(), icon: editIcon } : w));
        } else {
            setCategories(p => ({ ...p, [tab]: p[tab].map(c => c.id === editId ? { ...c, name: editName.trim(), icon: editIcon, ...(tab === "expense" ? { s2c_group: editS2cGroup } : {}) } : c) }));
        }
        setEditId(null); addToast({ type: "success", title: "Đã cập nhật" });
    };

    const items = tab === "wallets" ? wallets : tab === "backup" ? [] : categories[tab] || [];
    const tabLabel = tab === "wallets" ? "Ví / Thanh toán" : tab === "income" ? "Danh mục thu" : tab === "expense" ? "Danh mục chi" : "Sao lưu dữ liệu";

    // ─── Excel backup export using SheetJS ───
    const exportBackupExcel = async () => {
        setExporting(true);
        try {
            const wb = XLSX.utils.book_new();

            // Sheet 1: Transactions
            const txData = transactions.map(tx => ({
                "Mã GD": tx.id, "Loại": tx.type === "income" ? "Thu" : "Chi", "Ngày": tx.tx_date,
                "Mô tả": tx.description, "Số tiền": tx.amount, "Danh mục": tx.category_name || "",
                "Thanh toán": tx.payment_method, "Đối tác": tx.counterparty || "",
                "Hóa đơn": tx.has_invoice ? "Có" : "Không", "Nhóm VAT": tx.vat_group || "",
                "Đối soát": tx.reconciled ? "Đã" : "Chưa", "Trạng thái": tx.status || "confirmed",
                "Ảnh HĐ": tx.invoice_img ? "Có ảnh (base64)" : "",
            }));
            const ws1 = XLSX.utils.json_to_sheet(txData);
            ws1["!cols"] = [{ wch: 14 }, { wch: 6 }, { wch: 12 }, { wch: 30 }, { wch: 15 }, { wch: 18 }, { wch: 14 }, { wch: 20 }, { wch: 8 }, { wch: 12 }, { wch: 8 }, { wch: 10 }, { wch: 16 }];
            XLSX.utils.book_append_sheet(wb, ws1, "Thu chi");

            // Sheet 2: Categories
            const catData = [];
            categories.income.forEach(c => catData.push({ Loại: "Thu", Icon: c.icon, Tên: c.name, ID: c.id, "Nhóm S2c": "" }));
            categories.expense.forEach(c => catData.push({ Loại: "Chi", Icon: c.icon, Tên: c.name, ID: c.id, "Nhóm S2c": c.s2c_group || "e" }));
            const ws2 = XLSX.utils.json_to_sheet(catData);
            ws2["!cols"] = [{ wch: 6 }, { wch: 5 }, { wch: 25 }, { wch: 14 }];
            XLSX.utils.book_append_sheet(wb, ws2, "Danh mục");

            // Sheet 3: Wallets
            const walletData = wallets.map(w => ({ "Icon": w.icon, "Tên": w.name, "Loại": w.type === "cash" ? "Tiền mặt" : w.type === "bank" ? "Ngân hàng" : "Ví điện tử", "ID": w.id }));
            const ws3 = XLSX.utils.json_to_sheet(walletData);
            ws3["!cols"] = [{ wch: 5 }, { wch: 20 }, { wch: 14 }, { wch: 16 }];
            XLSX.utils.book_append_sheet(wb, ws3, "Ví thanh toán");

            // Sheet 4: Inventory
            const invData = [];
            inventory.forEach(item => {
                invData.push({ "Hàng hóa": item.name, "ĐVT": item.unit, "Tồn đầu kỳ SL": item.opening_qty, "Tồn đầu kỳ GT": item.opening_value, "---": "---" });
                item.movements.forEach(m => {
                    invData.push({ "Hàng hóa": "", "ĐVT": "", "Ngày": m.date, "Loại": m.type === "in" ? "Nhập" : "Xuất", "Số CT": m.doc, "Diễn giải": m.desc, "SL": m.qty, "Đơn giá": m.price || "" });
                });
            });
            if (invData.length > 0) {
                const ws4 = XLSX.utils.json_to_sheet(invData);
                ws4["!cols"] = [{ wch: 16 }, { wch: 6 }, { wch: 12 }, { wch: 6 }, { wch: 10 }, { wch: 25 }, { wch: 8 }, { wch: 12 }];
                XLSX.utils.book_append_sheet(wb, ws4, "Tồn kho");
            }

            // Sheet 5: Business info
            const bizData = [
                { Thông_tin: "Tên HKD", Giá_trị: business.name },
                { Thông_tin: "MST", Giá_trị: business.tax_id },
                { Thông_tin: "Địa chỉ", Giá_trị: business.address },
                { Thông_tin: "Bậc doanh thu", Giá_trị: business.revenue_tier },
                { Thông_tin: "Nhóm VAT mặc định", Giá_trị: business.default_vat_group },
                { Thông_tin: "PP tính PIT", Giá_trị: business.pit_method },
                { Thông_tin: "DT ước tính/năm", Giá_trị: business.annual_revenue_estimate },
                { Thông_tin: "Tiền mặt", Giá_trị: business.cash_balance },
                { Thông_tin: "Ngân hàng", Giá_trị: business.bank_balance },
                { Thông_tin: "Ngày xuất", Giá_trị: new Date().toISOString() },
            ];
            const ws5 = XLSX.utils.json_to_sheet(bizData);
            ws5["!cols"] = [{ wch: 22 }, { wch: 35 }];
            XLSX.utils.book_append_sheet(wb, ws5, "Thông tin HKD");

            // Sheet 6: Invoice images (base64 references)
            const imgTx = transactions.filter(t => t.invoice_img);
            if (imgTx.length > 0) {
                const imgData = imgTx.map(t => ({ "Mã GD": t.id, "Ngày": t.tx_date, "Mô tả": t.description, "Ảnh (base64)": t.invoice_img }));
                const ws6 = XLSX.utils.json_to_sheet(imgData);
                ws6["!cols"] = [{ wch: 14 }, { wch: 12 }, { wch: 30 }, { wch: 50 }];
                XLSX.utils.book_append_sheet(wb, ws6, "Ảnh hóa đơn");
            }

            // Sheet 7: Invoices
            if (invoices && invoices.length > 0) {
                const invData = invoices.map(inv => ({
                    "Mã HĐ": inv.id, "Số": inv.number, "Ký hiệu": inv.serial, "Ngày": inv.date,
                    "Người mua": inv.buyer_name, "Đơn vị mua": inv.buyer_company, "MST mua": inv.buyer_tax_id, "ĐC mua": inv.buyer_address,
                    "Thanh toán": inv.payment_method, "Tổng tiền": inv.total, "Trạng thái": inv.status,
                    "Dòng hàng": JSON.stringify(inv.items), "Ghi chú": inv.note || ""
                }));
                const ws7 = XLSX.utils.json_to_sheet(invData);
                ws7["!cols"] = [{ wch: 18 }, { wch: 10 }, { wch: 12 }, { wch: 12 }, { wch: 20 }, { wch: 25 }, { wch: 14 }, { wch: 30 }, { wch: 10 }, { wch: 15 }, { wch: 10 }, { wch: 40 }, { wch: 20 }];
                XLSX.utils.book_append_sheet(wb, ws7, "Hóa đơn bán");
            }

            // Download
            const fileName = `HKDTax_Backup_${business.tax_id || "HKD"}_${new Date().toISOString().split("T")[0]}.xlsx`;
            const wbOut = XLSX.write(wb, { bookType: "xlsx", type: "array" });
            const blob = new Blob([wbOut], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a"); a.href = url; a.download = fileName;
            document.body.appendChild(a); a.click();
            setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url); }, 100);
            addToast({ type: "success", title: "Xuất backup thành công!", detail: `${fileName} — ${transactions.length} giao dịch, ${inventory.length} hàng hóa` });
        } catch (err) {
            console.error(err);
            addToast({ type: "warning", title: "Lỗi xuất Excel", detail: err.message || "Vui lòng thử lại" });
        }
        setExporting(false);
    };

    // ─── Excel backup IMPORT ───
    const handleImportFile = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (importFileRef.current) importFileRef.current.value = "";
        setImporting(true);
        try {
            const data = await file.arrayBuffer();
            const wb = XLSX.read(data, { type: "array" });
            const preview = {
                fileName: file.name, fileSize: Math.round(file.size / 1024), sheets: wb.SheetNames,
                txCount: 0, catCount: 0, walletCount: 0, invCount: 0, hasBiz: false, hasImages: false, imgCount: 0, invoiceCount: 0,
                parsedTx: [], parsedCats: { income: [], expense: [] }, parsedWallets: [], parsedBiz: null, parsedInv: [], parsedImages: {}, parsedInvoices: []
            };

            // ── Sheet "Thu chi" ──
            if (wb.SheetNames.includes("Thu chi")) {
                const rows = XLSX.utils.sheet_to_json(wb.Sheets["Thu chi"]);
                preview.parsedTx = rows.map((r, i) => {
                    const type = String(r["Loại"] || "").includes("Thu") ? "income" : "expense";
                    const pm = r["Thanh toán"] || "cash";
                    const payMethod = pm === "cash" || pm === "bank_transfer" || pm === "ewallet" ? pm :
                        String(pm).includes("mặt") ? "cash" : String(pm).includes("CK") || String(pm).includes("chuyển") ? "bank_transfer" : "cash";
                    return {
                        id: r["Mã GD"] || `imp-${Date.now()}-${i}`, type,
                        tx_date: r["Ngày"] ? String(r["Ngày"]).slice(0, 10) : new Date().toISOString().split("T")[0],
                        description: r["Mô tả"] || "(không mô tả)",
                        amount: parseInt(String(r["Số tiền"] || 0).replace(/\D/g, "")) || 0,
                        category_name: r["Danh mục"] || "", category_id: "",
                        payment_method: payMethod, counterparty: r["Đối tác"] || "",
                        has_invoice: String(r["Hóa đơn"] || "").includes("Có"),
                        vat_group: r["Nhóm VAT"] || undefined,
                        reconciled: String(r["Đối soát"] || "").includes("Đã"),
                        status: r["Trạng thái"] || "confirmed",
                        invoice_img: null, invoice_thumb: null,
                    };
                }).filter(t => t.amount > 0);
                preview.txCount = preview.parsedTx.length;
            }

            // ── Sheet "Danh mục" ──
            if (wb.SheetNames.includes("Danh mục")) {
                const rows = XLSX.utils.sheet_to_json(wb.Sheets["Danh mục"]);
                rows.forEach(r => {
                    const cat = { id: r["ID"] || `c${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, name: r["Tên"] || "", icon: r["Icon"] || "📝" };
                    if (!cat.name) return;
                    const isExpense = !String(r["Loại"] || "").includes("Thu");
                    if (isExpense) cat.s2c_group = r["Nhóm S2c"] || "e";
                    if (!isExpense) preview.parsedCats.income.push(cat);
                    else preview.parsedCats.expense.push(cat);
                });
                preview.catCount = preview.parsedCats.income.length + preview.parsedCats.expense.length;
            }

            // ── Sheet "Ví thanh toán" ──
            if (wb.SheetNames.includes("Ví thanh toán")) {
                const rows = XLSX.utils.sheet_to_json(wb.Sheets["Ví thanh toán"]);
                preview.parsedWallets = rows.map(r => {
                    const ts = String(r["Loại"] || "");
                    const type = ts.includes("mặt") ? "cash" : ts.includes("Ngân") ? "bank" : "ewallet";
                    return { id: r["ID"] || `w${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, name: r["Tên"] || "", icon: r["Icon"] || "💳", type };
                }).filter(w => w.name);
                preview.walletCount = preview.parsedWallets.length;
            }

            // ── Sheet "Thông tin HKD" ──
            if (wb.SheetNames.includes("Thông tin HKD")) {
                const rows = XLSX.utils.sheet_to_json(wb.Sheets["Thông tin HKD"]);
                const kv = {}; rows.forEach(r => { kv[r["Thông_tin"] || r["Thông tin"] || ""] = r["Giá_trị"] || r["Giá trị"] || "" });
                preview.parsedBiz = {
                    name: kv["Tên HKD"] || "", tax_id: kv["MST"] || "", address: kv["Địa chỉ"] || "",
                    revenue_tier: kv["Bậc doanh thu"] || "under_500m",
                    default_vat_group: kv["Nhóm VAT mặc định"] || "service",
                    pit_method: kv["PP tính PIT"] || "REVENUE_PERCENT",
                    annual_revenue_estimate: parseInt(String(kv["DT ước tính/năm"] || 0).replace(/\D/g, "")) || 0,
                    cash_balance: parseInt(String(kv["Tiền mặt"] || 0).replace(/\D/g, "")) || 0,
                    bank_balance: parseInt(String(kv["Ngân hàng"] || 0).replace(/\D/g, "")) || 0,
                };
                preview.hasBiz = !!preview.parsedBiz.name;
            }

            // ── Sheet "Tồn kho" ──
            if (wb.SheetNames.includes("Tồn kho")) {
                const rows = XLSX.utils.sheet_to_json(wb.Sheets["Tồn kho"]);
                let cur = null;
                rows.forEach(r => {
                    if (r["Hàng hóa"] && r["Hàng hóa"] !== "") {
                        if (cur) preview.parsedInv.push(cur);
                        cur = {
                            id: `inv-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
                            name: r["Hàng hóa"], unit: r["ĐVT"] || "kg",
                            opening_qty: parseInt(r["Tồn đầu kỳ SL"]) || 0, opening_value: parseInt(r["Tồn đầu kỳ GT"]) || 0, movements: []
                        };
                    } else if (cur && r["Ngày"]) {
                        cur.movements.push({
                            date: String(r["Ngày"]).slice(0, 10), type: String(r["Loại"] || "").includes("Nhập") ? "in" : "out",
                            doc: r["Số CT"] || "", desc: r["Diễn giải"] || "", qty: parseInt(r["SL"]) || 0, price: parseInt(r["Đơn giá"]) || 0
                        });
                    }
                });
                if (cur) preview.parsedInv.push(cur);
                preview.invCount = preview.parsedInv.length;
            }

            // ── Sheet "Ảnh hóa đơn" ──
            if (wb.SheetNames.includes("Ảnh hóa đơn")) {
                const rows = XLSX.utils.sheet_to_json(wb.Sheets["Ảnh hóa đơn"]);
                rows.forEach(r => {
                    const id = r["Mã GD"]; const img = r["Ảnh (base64)"];
                    if (id && img && String(img).startsWith("data:image")) preview.parsedImages[id] = img;
                });
                preview.imgCount = Object.keys(preview.parsedImages).length;
                preview.hasImages = preview.imgCount > 0;
                if (preview.hasImages) preview.parsedTx.forEach(t => {
                    if (preview.parsedImages[t.id]) { t.invoice_img = preview.parsedImages[t.id]; t.has_invoice = true; }
                });
            }

            // Match category_id to transactions
            if (preview.parsedTx.length > 0 && preview.catCount > 0) {
                preview.parsedTx.forEach(t => {
                    const cats = t.type === "income" ? preview.parsedCats.income : preview.parsedCats.expense;
                    const match = cats.find(c => c.name === t.category_name);
                    if (match) t.category_id = match.id;
                    else if (cats.length > 0) t.category_id = cats[0].id;
                });
            }

            // ── Sheet "Hóa đơn bán" ──
            if (wb.SheetNames.includes("Hóa đơn bán")) {
                const rows = XLSX.utils.sheet_to_json(wb.Sheets["Hóa đơn bán"]);
                preview.parsedInvoices = rows.map(r => {
                    let items = []; try { items = JSON.parse(r["Dòng hàng"] || "[]") } catch { }
                    return {
                        id: r["Mã HĐ"] || `INV-${Date.now()}`, number: r["Số"] || "", serial: r["Ký hiệu"] || "", date: r["Ngày"] || "",
                        buyer_name: r["Người mua"] || "", buyer_company: r["Đơn vị mua"] || "", buyer_tax_id: r["MST mua"] || "", buyer_address: r["ĐC mua"] || "",
                        payment_method: r["Thanh toán"] || "TM/CK", total: parseInt(String(r["Tổng tiền"] || 0).replace(/\D/g, "")) || 0,
                        status: r["Trạng thái"] || "draft", items, note: r["Ghi chú"] || "", created_at: new Date().toISOString(), updated_at: new Date().toISOString()
                    };
                });
                preview.invoiceCount = preview.parsedInvoices.length;
            }

            if (preview.txCount === 0 && preview.catCount === 0 && preview.walletCount === 0 && !preview.hasBiz && preview.invCount === 0 && preview.invoiceCount === 0) {
                addToast({ type: "warning", title: "File không có dữ liệu", detail: `Không tìm thấy sheet phù hợp trong ${file.name}. Hãy dùng file đã xuất từ HKD Tax.` });
            } else {
                setImportPreview(preview);
            }
        } catch (err) {
            console.error(err);
            addToast({ type: "warning", title: "Không đọc được file", detail: err.message || "File phải là .xlsx xuất từ HKD Tax Backup" });
        }
        setImporting(false);
    };

    // ── Confirm import ──
    const confirmImport = (mode) => {
        if (!importPreview) return;
        const p = importPreview;
        try {
            if (mode === "replace") {
                if (p.parsedTx.length > 0 && setTransactions) setTransactions(p.parsedTx);
                if (p.catCount > 0) setCategories(p.parsedCats);
                if (p.parsedWallets.length > 0) setWallets(p.parsedWallets);
                if (p.parsedBiz && setBusiness) setBusiness(prev => ({ ...prev, ...p.parsedBiz }));
                if (p.parsedInv.length > 0 && setInventory) setInventory(p.parsedInv);
                if (p.parsedInvoices.length > 0 && setInvoices) setInvoices(p.parsedInvoices);
                addToast({
                    type: "success", title: "Khôi phục dữ liệu thành công!",
                    detail: `Thay thế toàn bộ: ${p.txCount} GD, ${p.catCount} DM, ${p.walletCount} ví${p.invCount > 0 ? `, ${p.invCount} hàng hóa` : ""}${p.invoiceCount > 0 ? `, ${p.invoiceCount} hóa đơn` : ""}${p.imgCount > 0 ? `, ${p.imgCount} ảnh HĐ` : ""}`
                });
            } else {
                // Merge — only add new, skip duplicates by ID
                if (p.parsedTx.length > 0 && setTransactions) {
                    setTransactions(prev => { const ids = new Set(prev.map(t => t.id)); const nw = p.parsedTx.filter(t => !ids.has(t.id)); return [...nw, ...prev] });
                }
                if (p.catCount > 0) setCategories(prev => ({
                    income: [...prev.income, ...p.parsedCats.income.filter(c => !prev.income.some(x => x.id === c.id))],
                    expense: [...prev.expense, ...p.parsedCats.expense.filter(c => !prev.expense.some(x => x.id === c.id))]
                }));
                if (p.parsedWallets.length > 0) setWallets(prev => [...prev, ...p.parsedWallets.filter(w => !prev.some(x => x.id === w.id))]);
                if (p.parsedInvoices.length > 0 && setInvoices) setInvoices(prev => [...prev, ...p.parsedInvoices.filter(inv => !prev.some(x => x.id === inv.id))]);
                addToast({ type: "success", title: "Gộp dữ liệu thành công!", detail: "Đã thêm dữ liệu mới, bỏ qua trùng lặp (theo mã GD)" });
            }
        } catch (err) { addToast({ type: "warning", title: "Lỗi import", detail: err.message }) }
        setImportPreview(null);
    };

    return (<>
        <div className="page-header"><div><h1 className="page-title">Cấu hình</h1><p className="page-subtitle">Quản lý ví, danh mục thu chi</p></div>
            {tab !== "backup" && <button className="btn btn-primary" onClick={() => { setShowAdd(true); setNewName(""); setNewIcon(tab === "wallets" ? "💳" : "📝") }}><Icons.Plus /> Thêm mới</button>}
        </div>
        <div className="page-body">
            {/* Tab selector */}
            <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                {[{ id: "wallets", label: "💳 Ví / TT", count: wallets.length }, { id: "income", label: "↗ DM thu", count: categories.income.length }, { id: "expense", label: "↙ DM chi", count: categories.expense.length }, { id: "backup", label: "💾 Sao lưu", count: null }].map(t => (
                    <button key={t.id} onClick={() => { setTab(t.id); setEditId(null); setShowAdd(false) }} style={{
                        padding: "10px 18px", borderRadius: "var(--radius-md)", border: tab === t.id ? "2px solid var(--accent)" : "2px solid var(--border)",
                        background: tab === t.id ? "var(--accent-light)" : "var(--bg-card)", color: tab === t.id ? "var(--accent)" : "var(--text-secondary)",
                        fontWeight: 600, fontSize: ".85rem", cursor: "pointer", transition: "all .15s", fontFamily: "var(--font)", display: "flex", alignItems: "center", gap: 8
                    }}>{t.label}{t.count !== null && <span style={{ background: tab === t.id ? "var(--accent)" : "var(--bg-elevated)", color: tab === t.id ? "white" : "var(--text-tertiary)", padding: "2px 8px", borderRadius: "var(--radius-full)", fontSize: ".72rem", fontWeight: 700 }}>{t.count}</span>}</button>
                ))}
            </div>

            {/* Items list — wallets/income/expense tabs */}
            {tab !== "backup" && (<>
                <div className="card card-glow fade-up">
                    <div className="card-header"><span className="card-title">{tabLabel}</span>
                        <span style={{ fontSize: ".72rem", color: "var(--text-tertiary)" }}>{items.length} mục</span>
                    </div>
                    <div className="card-body" style={{ padding: "8px 16px" }}>
                        {items.length === 0 ? (
                            <div style={{ textAlign: "center", padding: 30, color: "var(--text-tertiary)" }}><div style={{ fontSize: "2rem", marginBottom: 8 }}>📭</div>Chưa có mục nào</div>
                        ) : items.map((item, i) => (
                            <div key={item.id} className="fade-up" style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 8px", borderBottom: i < items.length - 1 ? "1px solid var(--border-light)" : "none", animationDelay: `${i * .03}s` }}>
                                {editId === item.id ? (
                                    /* Inline edit mode */
                                    <>
                                        <div style={{ position: "relative" }}>
                                            <div style={{ width: 40, height: 40, borderRadius: "var(--radius-sm)", background: "var(--bg-elevated)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", cursor: "pointer", border: "2px dashed var(--accent)" }}
                                                onClick={() => { const idx = EMOJI_PICKER.indexOf(editIcon); setEditIcon(EMOJI_PICKER[(idx + 1) % EMOJI_PICKER.length]) }}>{editIcon}</div>
                                        </div>
                                        <input className="field-input" value={editName} onChange={e => setEditName(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSaveEdit()} style={{ flex: 1, padding: "8px 12px", fontSize: ".88rem" }} autoFocus />
                                        {tab === "wallets" && <select className="field-input" value={item.type} style={{ width: 100, padding: "8px", fontSize: ".78rem" }} onChange={e => setWallets(p => p.map(w => w.id === item.id ? { ...w, type: e.target.value } : w))}><option value="cash">Tiền mặt</option><option value="bank">Ngân hàng</option><option value="ewallet">Ví điện tử</option></select>}
                                        {tab === "expense" && <select className="field-input" value={editS2cGroup} style={{ width: 120, padding: "8px", fontSize: ".76rem" }} onChange={e => setEditS2cGroup(e.target.value)}>{S2C_GROUPS.map(g => <option key={g.code} value={g.code}>{g.code}) {g.shortLabel}</option>)}</select>}
                                        <button className="btn btn-primary" style={{ padding: "6px 12px", fontSize: ".78rem" }} onClick={handleSaveEdit}><Icons.Check /></button>
                                        <button className="btn btn-secondary" style={{ padding: "6px 12px", fontSize: ".78rem" }} onClick={() => setEditId(null)}><Icons.X /></button>
                                    </>
                                ) : (
                                    /* Display mode */
                                    <>
                                        <div style={{ width: 40, height: 40, borderRadius: "var(--radius-sm)", background: "var(--bg-elevated)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", flexShrink: 0 }}>{item.icon}</div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontWeight: 600, fontSize: ".88rem" }}>{item.name}</div>
                                            {tab === "wallets" && <div style={{ fontSize: ".72rem", color: "var(--text-tertiary)" }}>Loại: {item.type === "cash" ? "Tiền mặt" : item.type === "bank" ? "Ngân hàng" : "Ví điện tử"}</div>}
                                            {tab === "expense" && (() => {
                                                const grp = S2C_GROUPS.find(g => g.code === item.s2c_group);
                                                return grp ? (
                                                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 3 }}>
                                                        <span style={{ fontSize: ".68rem", fontWeight: 700, padding: "1px 8px", borderRadius: 10, background: grp.bg, color: grp.color, border: `1px solid ${grp.color}33` }}>{grp.code})</span>
                                                        <span style={{ fontSize: ".72rem", color: "var(--text-tertiary)" }}>{grp.shortLabel}</span>
                                                    </div>
                                                ) : (<div style={{ fontSize: ".72rem", color: "var(--yellow)", marginTop: 3 }}>⚠ Chưa gán nhóm S2c</div>);
                                            })()}
                                        </div>
                                        <button className="btn btn-secondary" style={{ padding: "6px 10px", fontSize: ".72rem" }} onClick={() => { setEditId(item.id); setEditName(item.name); setEditIcon(item.icon); if (item.s2c_group) setEditS2cGroup(item.s2c_group) }}><Icons.Edit /> Sửa</button>
                                        <button style={{ padding: "6px 10px", fontSize: ".72rem", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", background: "transparent", color: "var(--red)", cursor: "pointer", fontFamily: "var(--font)", display: "flex", alignItems: "center", gap: 4 }} onClick={() => handleDelete(item.id)}><Icons.Trash /></button>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <div style={{ marginTop: 16, padding: "12px 16px", background: "var(--bg-elevated)", borderRadius: "var(--radius-md)", fontSize: ".78rem", color: "var(--text-tertiary)", display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ fontSize: "1rem" }}>💡</span>
                    <span>{tab === "expense"
                        ? "Mỗi danh mục chi được gán vào 1 trong 6 nhóm S2c theo TT152/2025/TT-BTC. Khi xuất sổ S2c-HKD, chi phí sẽ tự động phân loại theo nhóm tương ứng."
                        : "Các thay đổi ở đây sẽ hiển thị ngay trong form \"Thêm thu/chi\". Nhấn vào icon để chọn emoji khi thêm hoặc sửa."
                    }</span>
                </div>
            </>)}

            {/* Backup tab */}
            {tab === "backup" && (
                <div className="fade-up">
                    {/* Summary cards */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 14, marginBottom: 20 }}>
                        <div className="stat-card green" style={{ padding: "14px 18px" }}><div className="stat-label" style={{ fontSize: ".68rem" }}>Giao dịch</div><div className="stat-value green" style={{ fontSize: "1.15rem" }}>{transactions.length}</div></div>
                        <div className="stat-card blue" style={{ padding: "14px 18px" }}><div className="stat-label" style={{ fontSize: ".68rem" }}>Hàng hóa</div><div className="stat-value blue" style={{ fontSize: "1.15rem" }}>{inventory.length}</div></div>
                        <div className="stat-card accent" style={{ padding: "14px 18px" }}><div className="stat-label" style={{ fontSize: ".68rem" }}>Hóa đơn</div><div className="stat-value accent" style={{ fontSize: "1.15rem" }}>{invoices?.length || 0}</div></div>
                        <div className="stat-card accent" style={{ padding: "14px 18px" }}><div className="stat-label" style={{ fontSize: ".68rem" }}>Ảnh HĐ</div><div className="stat-value accent" style={{ fontSize: "1.15rem" }}>{transactions.filter(t => t.invoice_img).length}</div></div>
                    </div>

                    {/* Export card */}
                    <div className="card card-glow">
                        <div className="card-header"><span className="card-title">Xuất Backup Excel (.xlsx)</span></div>
                        <div className="card-body" style={{ padding: "20px" }}>
                            <div style={{ fontSize: ".85rem", color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.6 }}>
                                File Excel sẽ bao gồm tất cả dữ liệu hiện tại:
                            </div>
                            {/* Sheet list */}
                            <div style={{ borderRadius: "var(--radius-md)", border: "1px solid var(--border-light)", overflow: "hidden", marginBottom: 16 }}>
                                {[
                                    { icon: "📊", sheet: "Thu chi", detail: `${transactions.length} giao dịch — mã GD, ngày, mô tả, số tiền, danh mục, VAT, đối soát`, color: "var(--green)" },
                                    { icon: "📁", sheet: "Danh mục", detail: `${categories.income.length} danh mục thu + ${categories.expense.length} danh mục chi`, color: "var(--blue)" },
                                    { icon: "💳", sheet: "Ví thanh toán", detail: `${wallets.length} phương thức — loại ví, tên`, color: "var(--accent)" },
                                    { icon: "📦", sheet: "Tồn kho", detail: `${inventory.length} hàng hóa — tồn đầu kỳ, nhập/xuất`, color: "var(--yellow)" },
                                    { icon: "🏢", sheet: "Thông tin HKD", detail: `${business.name} — MST, địa chỉ, cấu hình thuế`, color: "var(--text-primary)" },
                                    { icon: "📷", sheet: "Ảnh hóa đơn", detail: `${transactions.filter(t => t.invoice_img).length} ảnh — base64 embedded`, color: "var(--accent)" },
                                    { icon: "📄", sheet: "Hóa đơn bán", detail: `${invoices?.length || 0} hóa đơn bán hàng — người mua, hàng hóa, tổng tiền`, color: "var(--blue)" },
                                ].map((s, i) => (
                                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderBottom: i < 6 ? "1px solid var(--border-light)" : "none", background: i % 2 === 0 ? "var(--bg-card)" : "var(--bg-elevated)" }}>
                                        <span style={{ fontSize: "1.2rem" }}>{s.icon}</span>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontWeight: 600, fontSize: ".85rem", color: s.color }}>Sheet: {s.sheet}</div>
                                            <div style={{ fontSize: ".72rem", color: "var(--text-tertiary)" }}>{s.detail}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button className="btn btn-primary btn-lg" style={{ width: "100%", justifyContent: "center", gap: 8 }} onClick={exportBackupExcel} disabled={exporting}>
                                {exporting ? (<><div style={{ width: 18, height: 18, border: "2px solid rgba(255,255,255,.3)", borderTopColor: "white", borderRadius: "50%", animation: "spin .6s linear infinite" }} /> Đang xuất...</>) : (<><Icons.Download /> Xuất Backup Excel</>)}
                            </button>

                            <div style={{ marginTop: 12, fontSize: ".72rem", color: "var(--text-tertiary)", textAlign: "center" }}>
                                File: HKDTax_Backup_{business.tax_id || "HKD"}_{new Date().toISOString().split("T")[0]}.xlsx
                            </div>
                        </div>
                    </div>

                    {/* Tip */}
                    <div style={{ marginTop: 16, padding: "12px 16px", background: "var(--bg-elevated)", borderRadius: "var(--radius-md)", fontSize: ".78rem", color: "var(--text-tertiary)", display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <span style={{ fontSize: "1rem" }}>💡</span>
                        <span>Nên xuất backup định kỳ (hàng tuần/tháng) để lưu trữ an toàn. File Excel có thể mở bằng Excel, Google Sheets, hoặc LibreOffice. Ảnh hóa đơn được lưu dạng base64 trong sheet riêng.</span>
                    </div>

                    {/* ──── IMPORT CARD ──── */}
                    <div className="card card-glow" style={{ marginTop: 20 }}>
                        <div className="card-header">
                            <span className="card-title">Nhập dữ liệu từ Backup (.xlsx)</span>
                            <span style={{ background: "var(--blue-light)", color: "var(--blue)", padding: "4px 10px", borderRadius: "var(--radius-full)", fontSize: ".68rem", fontWeight: 700 }}>IMPORT</span>
                        </div>
                        <div className="card-body" style={{ padding: "20px" }}>
                            <div style={{ fontSize: ".85rem", color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.6 }}>
                                Khôi phục dữ liệu từ file backup đã xuất trước đó. Hỗ trợ đọc tất cả sheet: giao dịch, danh mục, ví, tồn kho, thông tin HKD, ảnh hóa đơn.
                            </div>

                            {/* Drop zone / file input */}
                            <input type="file" ref={importFileRef} accept=".xlsx,.xls" onChange={handleImportFile} style={{ display: "none" }} />
                            <div onClick={() => !importing && importFileRef.current?.click()} style={{
                                border: "2px dashed var(--border)", borderRadius: "var(--radius-lg)", padding: "32px 20px", textAlign: "center",
                                cursor: importing ? "wait" : "pointer", transition: "all .2s", background: "var(--bg-elevated)"
                            }} onMouseOver={e => { if (!importing) { e.currentTarget.style.borderColor = "var(--blue)"; e.currentTarget.style.background = "var(--blue-light)" } }}
                                onMouseOut={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.background = "var(--bg-elevated)" }}>
                                {importing ? (
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                                        <div style={{ width: 20, height: 20, border: "2px solid var(--border)", borderTopColor: "var(--blue)", borderRadius: "50%", animation: "spin .6s linear infinite" }} />
                                        <span style={{ color: "var(--blue)", fontWeight: 600, fontSize: ".88rem" }}>Đang đọc file...</span>
                                    </div>
                                ) : (
                                    <>
                                        <div style={{ fontSize: "2.5rem", marginBottom: 8 }}>📂</div>
                                        <div style={{ fontWeight: 600, fontSize: ".92rem", color: "var(--text-primary)", marginBottom: 4 }}>Nhấn để chọn file backup</div>
                                        <div style={{ fontSize: ".75rem", color: "var(--text-tertiary)" }}>Chấp nhận .xlsx đã xuất từ HKD Tax · Xem trước trước khi áp dụng</div>
                                    </>
                                )}
                            </div>

                            {/* Security note */}
                            <div style={{ marginTop: 12, display: "flex", gap: 8, alignItems: "center", padding: "8px 12px", background: "var(--bg-warm)", borderRadius: "var(--radius-sm)", fontSize: ".72rem", color: "var(--text-tertiary)" }}>
                                <span>🔒</span>
                                <span>File được xử lý hoàn toàn trên thiết bị của bạn — không upload lên server nào.</span>
                            </div>
                        </div>
                    </div>

                    {/* ──── IMPORT PREVIEW MODAL ──── */}
                    {importPreview && (
                        <div className="modal-overlay" onClick={() => setImportPreview(null)}>
                            <div className="modal card-glow" onClick={e => e.stopPropagation()} style={{ maxWidth: 560 }}>
                                <div className="modal-header">
                                    <h2 className="modal-title">Xem trước dữ liệu Import</h2>
                                    <button className="modal-close" onClick={() => setImportPreview(null)}><Icons.X /></button>
                                </div>
                                <div className="modal-body" style={{ maxHeight: "65vh", overflowY: "auto" }}>
                                    {/* File info */}
                                    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", background: "var(--bg-elevated)", borderRadius: "var(--radius-md)", marginBottom: 16 }}>
                                        <span style={{ fontSize: "1.5rem" }}>📊</span>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontWeight: 700, fontSize: ".88rem" }}>{importPreview.fileName}</div>
                                            <div style={{ fontSize: ".72rem", color: "var(--text-tertiary)" }}>{importPreview.fileSize} KB · {importPreview.sheets.length} sheets: {importPreview.sheets.join(", ")}</div>
                                        </div>
                                    </div>

                                    {/* Data summary grid */}
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
                                        {[
                                            { icon: "📊", label: "Giao dịch", count: importPreview.txCount, color: "var(--green)", detail: importPreview.txCount > 0 ? `${importPreview.parsedTx.filter(t => t.type === "income").length} thu + ${importPreview.parsedTx.filter(t => t.type === "expense").length} chi` : "Không có" },
                                            { icon: "📁", label: "Danh mục", count: importPreview.catCount, color: "var(--blue)", detail: importPreview.catCount > 0 ? `${importPreview.parsedCats.income.length} thu + ${importPreview.parsedCats.expense.length} chi` : "Không có" },
                                            { icon: "💳", label: "Ví thanh toán", count: importPreview.walletCount, color: "var(--accent)", detail: importPreview.walletCount > 0 ? importPreview.parsedWallets.map(w => w.name).slice(0, 3).join(", ") : "Không có" },
                                            { icon: "📦", label: "Tồn kho", count: importPreview.invCount, color: "var(--yellow)", detail: importPreview.invCount > 0 ? importPreview.parsedInv.map(i => i.name).slice(0, 3).join(", ") : "Không có" },
                                            { icon: "🏢", label: "Thông tin HKD", count: importPreview.hasBiz ? 1 : 0, color: "var(--text-primary)", detail: importPreview.hasBiz ? importPreview.parsedBiz.name : "Không có" },
                                            { icon: "📷", label: "Ảnh hóa đơn", count: importPreview.imgCount || 0, color: "var(--accent)", detail: importPreview.hasImages ? `${importPreview.imgCount} ảnh base64` : "Không có" },
                                        ].map((s, i) => (
                                            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-light)", background: s.count > 0 ? "var(--bg-card)" : "var(--bg-elevated)", opacity: s.count > 0 ? 1 : 0.5 }}>
                                                <span style={{ fontSize: "1.3rem" }}>{s.icon}</span>
                                                <div style={{ flex: 1 }}>
                                                    <div style={{ fontWeight: 600, fontSize: ".82rem", color: s.count > 0 ? s.color : "var(--text-tertiary)" }}>{s.label}: {s.count}</div>
                                                    <div style={{ fontSize: ".68rem", color: "var(--text-tertiary)", marginTop: 1 }}>{s.detail}</div>
                                                </div>
                                                {s.count > 0 && <span style={{ color: "var(--green)", fontSize: ".82rem" }}>✓</span>}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Transaction preview (first 5) */}
                                    {importPreview.txCount > 0 && (
                                        <div style={{ marginBottom: 16 }}>
                                            <div style={{ fontWeight: 600, fontSize: ".82rem", marginBottom: 8, color: "var(--text-secondary)" }}>Xem trước giao dịch ({Math.min(5, importPreview.txCount)}/{importPreview.txCount}):</div>
                                            <div style={{ borderRadius: "var(--radius-md)", border: "1px solid var(--border-light)", overflow: "hidden" }}>
                                                {importPreview.parsedTx.slice(0, 5).map((t, i) => (
                                                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", borderBottom: i < 4 ? "1px solid var(--border-light)" : "none", fontSize: ".78rem", background: i % 2 === 0 ? "var(--bg-card)" : "var(--bg-elevated)" }}>
                                                        <span style={{ color: t.type === "income" ? "var(--green)" : "var(--red)", fontWeight: 700, fontSize: ".72rem" }}>{t.type === "income" ? "↗ Thu" : "↙ Chi"}</span>
                                                        <span style={{ flex: 1, fontWeight: 500 }}>{t.description}</span>
                                                        <span style={{ fontSize: ".68rem", color: "var(--text-tertiary)" }}>{t.tx_date}</span>
                                                        <span style={{ fontWeight: 700, fontFamily: "var(--font-mono)", fontSize: ".78rem", color: t.type === "income" ? "var(--green)" : "var(--accent)" }}>{fmtVND(t.amount)}</span>
                                                    </div>
                                                ))}
                                                {importPreview.txCount > 5 && (
                                                    <div style={{ padding: "6px 12px", textAlign: "center", fontSize: ".72rem", color: "var(--text-tertiary)", background: "var(--bg-elevated)" }}>
                                                        ... và {importPreview.txCount - 5} giao dịch khác
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Current vs Import comparison */}
                                    <div style={{ padding: "12px 16px", background: "var(--bg-warm)", borderRadius: "var(--radius-md)", marginBottom: 16 }}>
                                        <div style={{ fontWeight: 600, fontSize: ".82rem", marginBottom: 8 }}>So sánh dữ liệu:</div>
                                        <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 8, fontSize: ".78rem" }}>
                                            <div style={{ textAlign: "center" }}><div style={{ fontWeight: 700, color: "var(--text-secondary)" }}>Hiện tại</div><div style={{ fontFamily: "var(--font-mono)", fontWeight: 700, color: "var(--accent)", fontSize: "1rem", margin: "4px 0" }}>{transactions.length}</div><div style={{ color: "var(--text-tertiary)", fontSize: ".68rem" }}>giao dịch</div></div>
                                            <div style={{ display: "flex", alignItems: "center", color: "var(--text-tertiary)", fontSize: "1.2rem" }}>→</div>
                                            <div style={{ textAlign: "center" }}><div style={{ fontWeight: 700, color: "var(--text-secondary)" }}>Backup</div><div style={{ fontFamily: "var(--font-mono)", fontWeight: 700, color: "var(--blue)", fontSize: "1rem", margin: "4px 0" }}>{importPreview.txCount}</div><div style={{ color: "var(--text-tertiary)", fontSize: ".68rem" }}>giao dịch</div></div>
                                        </div>
                                    </div>

                                    {/* Warning */}
                                    <div style={{ padding: "10px 14px", background: "var(--red-light)", borderRadius: "var(--radius-sm)", fontSize: ".78rem", color: "var(--red)", fontWeight: 500, marginBottom: 8, display: "flex", alignItems: "flex-start", gap: 8 }}>
                                        <span>⚠️</span>
                                        <span><strong>Thay thế</strong> sẽ xóa toàn bộ dữ liệu hiện tại và thay bằng dữ liệu từ backup. <strong>Gộp</strong> sẽ thêm dữ liệu mới, bỏ qua trùng lặp theo mã GD.</span>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div style={{ padding: "16px 24px", borderTop: "1px solid var(--border-light)", display: "flex", gap: 10 }}>
                                    <button className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }} onClick={() => setImportPreview(null)}>Hủy</button>
                                    <button className="btn btn-primary" style={{ flex: 1, justifyContent: "center", gap: 6, background: "var(--blue)" }} onClick={() => confirmImport("merge")}>
                                        <Icons.Plus /> Gộp dữ liệu
                                    </button>
                                    <button className="btn btn-primary" style={{ flex: 1, justifyContent: "center", gap: 6, background: "var(--red)" }} onClick={() => {
                                        if (window.confirm(`Bạn chắc chắn muốn THAY THẾ toàn bộ dữ liệu hiện tại (${transactions.length} GD) bằng backup (${importPreview.txCount} GD)?\n\nHành động này không thể hoàn tác!`)) {
                                            confirmImport("replace");
                                        }
                                    }}>
                                        <Icons.RefreshCw /> Thay thế
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Add modal */}
            {showAdd && (
                <div className="modal-overlay" onClick={() => setShowAdd(false)}><div className="modal card-glow" onClick={e => e.stopPropagation()} style={{ maxWidth: 440 }}>
                    <div className="modal-header"><h2 className="modal-title">Thêm {tab === "wallets" ? "ví / phương thức TT" : tab === "income" ? "danh mục thu" : "danh mục chi"}</h2><button className="modal-close" onClick={() => setShowAdd(false)}><Icons.X /></button></div>
                    <div className="modal-body">
                        <div className="field">
                            <label className="field-label">Chọn icon</label>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                                {EMOJI_PICKER.map(e => (
                                    <div key={e} onClick={() => setNewIcon(e)} style={{ width: 36, height: 36, borderRadius: "var(--radius-sm)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", cursor: "pointer", border: newIcon === e ? "2px solid var(--accent)" : "2px solid var(--border)", background: newIcon === e ? "var(--accent-light)" : "var(--bg-card)", transition: "all .1s" }}>{e}</div>
                                ))}
                            </div>
                        </div>
                        <div className="field"><label className="field-label">Tên</label><input className="field-input" placeholder={tab === "wallets" ? "VD: MoMo, ZaloPay, Vietcombank..." : "VD: Tiền hoa hồng, Phí giao hàng..."} value={newName} onChange={e => setNewName(e.target.value)} onKeyDown={e => e.key === "Enter" && handleAdd()} autoFocus /></div>
                        {tab === "wallets" && (
                            <div className="field"><label className="field-label">Loại ví</label>
                                <div style={{ display: "flex", gap: 8 }}>
                                    {[{ id: "cash", label: "💵 Tiền mặt" }, { id: "bank", label: "🏦 Ngân hàng" }, { id: "ewallet", label: "📱 Ví điện tử" }].map(t => (
                                        <button key={t.id} className={`btn ${newWalletType === t.id ? "btn-primary" : "btn-secondary"}`} onClick={() => setNewWalletType(t.id)} style={{ flex: 1, justifyContent: "center", fontSize: ".82rem" }}>{t.label}</button>
                                    ))}
                                </div>
                            </div>
                        )}
                        {tab === "expense" && (
                            <div className="field"><label className="field-label">Nhóm S2c (TT152/2025)</label>
                                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                                    {S2C_GROUPS.map(g => (
                                        <div key={g.code} onClick={() => setNewS2cGroup(g.code)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: "var(--radius-sm)", border: `2px solid ${newS2cGroup === g.code ? g.color : "var(--border)"}`, background: newS2cGroup === g.code ? g.bg : "var(--bg-card)", cursor: "pointer", transition: "all .15s" }}>
                                            <div style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${newS2cGroup === g.code ? g.color : "var(--border)"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                                {newS2cGroup === g.code && <div style={{ width: 9, height: 9, borderRadius: "50%", background: g.color }} />}
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <span style={{ fontWeight: 600, fontSize: ".82rem", color: g.color }}>{g.code})</span>
                                                <span style={{ fontSize: ".82rem", marginLeft: 6 }}>{g.shortLabel}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        <div style={{ display: "flex", gap: 10, alignItems: "center", padding: "12px 16px", background: "var(--bg-elevated)", borderRadius: "var(--radius-md)", marginBottom: 12 }}>
                            <span style={{ fontSize: "1.6rem" }}>{newIcon}</span>
                            <span style={{ fontWeight: 600, fontSize: ".95rem" }}>{newName || "..."}</span>
                        </div>
                        <button className="btn btn-primary btn-lg" style={{ width: "100%", justifyContent: "center" }} onClick={handleAdd} disabled={!newName.trim()}>Thêm</button>
                    </div>
                </div></div>
            )}
        </div>
    </>);
}

// ═══════════════════════════════════════════════════════════════════════════════
// CASHBOOK PAGE — Sổ tiền (Tiền mặt + Ngân hàng + Tổng dòng tiền)
// ═══════════════════════════════════════════════════════════════════════════════
function CashBookPage({ transactions, business, addToast, wallets }) {
    const [tab, setTab] = useState("all"); // all | cash | bank | ewallet
    const allTx = [...transactions].sort((a, b) => a.tx_date.localeCompare(b.tx_date));
    const filterTx = tab === "all" ? allTx : allTx.filter(t => {
        if (tab === "cash") return t.payment_method === "cash";
        if (tab === "bank") return t.payment_method === "bank_transfer";
        return t.payment_method === "ewallet";
    });

    // Running balance calculation
    const openBal = tab === "cash" ? (business.cash_balance || 0) : tab === "bank" ? (business.bank_balance || 0) : tab === "ewallet" ? 0 : (business.cash_balance || 0) + (business.bank_balance || 0);
    let runBal = openBal;
    const rows = filterTx.map(t => {
        const inAmt = t.type === "income" ? t.amount : 0;
        const outAmt = t.type === "expense" ? t.amount : 0;
        runBal += inAmt - outAmt;
        return { ...t, inAmt, outAmt, balance: runBal };
    });
    const totalIn = rows.reduce((s, r) => s + r.inAmt, 0);
    const totalOut = rows.reduce((s, r) => s + r.outAmt, 0);
    const endBal = runBal;

    // Monthly summary
    const months = ["01", "02", "03"];
    const monthly = months.map(m => {
        const mTx = filterTx.filter(t => t.tx_date.includes(`-${m}-`));
        const inc = mTx.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0);
        const exp = mTx.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0);
        return { month: `Tháng ${parseInt(m)}`, income: inc, expense: exp, net: inc - exp };
    });

    const tabStyle = (active) => ({ padding: "10px 18px", borderRadius: 20, border: active ? "2px solid var(--accent)" : "2px solid var(--border)", background: active ? "var(--accent-light)" : "transparent", color: active ? "var(--accent)" : "var(--text-tertiary)", fontWeight: active ? 700 : 500, fontSize: ".82rem", cursor: "pointer", transition: "all .2s", fontFamily: "var(--font)", display: "inline-flex", alignItems: "center", gap: 6 });

    const handleExport = () => {
        const label = tab === "cash" ? "TIỀN MẶT" : tab === "bank" ? "NGÂN HÀNG" : tab === "ewallet" ? "VÍ ĐIỆN TỬ" : "TỔNG DÒNG TIỀN";
        exportS2e(filterTx, { ...business, cash_balance: openBal, bank_balance: 0 });
        addToast({ type: "success", title: `Đã xuất Sổ ${label}`, detail: "CSV + In sổ" });
    };

    return (<>
        <div className="page-header">
            <div><h1 className="page-title">Sổ tiền</h1><p className="page-subtitle">Theo dõi dòng tiền mặt, ngân hàng và ví điện tử</p></div>
            <button className="btn btn-primary" style={{ gap: 6 }} onClick={handleExport}><Icons.Print /> In sổ S2e</button>
        </div>
        <div className="page-body">
            {/* Stat cards */}
            <div className="stat-grid" style={{ marginBottom: 20 }}>
                <div className="stat-card" onClick={() => setTab("cash")} style={{ cursor: "pointer", borderLeft: tab === "cash" ? "3px solid var(--green)" : "3px solid transparent" }}>
                    <div className="stat-label">💵 Tiền mặt</div>
                    <div className="stat-value" style={{ color: "var(--green)" }}>{fmtVND((business.cash_balance || 0) + allTx.filter(t => t.payment_method === "cash").reduce((s, t) => s + (t.type === "income" ? t.amount : -t.amount), 0))}</div>
                    <div className="stat-sub">{allTx.filter(t => t.payment_method === "cash").length} giao dịch</div>
                </div>
                <div className="stat-card" onClick={() => setTab("bank")} style={{ cursor: "pointer", borderLeft: tab === "bank" ? "3px solid var(--blue)" : "3px solid transparent" }}>
                    <div className="stat-label">🏦 Ngân hàng</div>
                    <div className="stat-value" style={{ color: "var(--blue)" }}>{fmtVND((business.bank_balance || 0) + allTx.filter(t => t.payment_method === "bank_transfer").reduce((s, t) => s + (t.type === "income" ? t.amount : -t.amount), 0))}</div>
                    <div className="stat-sub">{allTx.filter(t => t.payment_method === "bank_transfer").length} giao dịch</div>
                </div>
                <div className="stat-card" onClick={() => setTab("ewallet")} style={{ cursor: "pointer", borderLeft: tab === "ewallet" ? "3px solid var(--accent)" : "3px solid transparent" }}>
                    <div className="stat-label">📱 Ví điện tử</div>
                    <div className="stat-value" style={{ color: "var(--accent)" }}>{fmtVND(allTx.filter(t => t.payment_method === "ewallet").reduce((s, t) => s + (t.type === "income" ? t.amount : -t.amount), 0))}</div>
                    <div className="stat-sub">{allTx.filter(t => t.payment_method === "ewallet").length} giao dịch</div>
                </div>
                <div className="stat-card" onClick={() => setTab("all")} style={{ cursor: "pointer", borderLeft: tab === "all" ? "3px solid var(--text-primary)" : "3px solid transparent" }}>
                    <div className="stat-label">📊 Tổng dòng tiền</div>
                    <div className="stat-value">{fmtVND(endBal)}</div>
                    <div className="stat-sub">Thu: +{fmt(totalIn)} · Chi: −{fmt(totalOut)}</div>
                </div>
            </div>

            {/* Monthly summary */}
            <div className="card card-glow fade-up" style={{ marginBottom: 20 }}>
                <div className="card-header"><span className="card-title">Tổng hợp theo tháng</span></div>
                <div className="card-body" style={{ padding: "12px 20px" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead><tr>
                            <th style={{ textAlign: "left", padding: "8px 6px", fontSize: ".76rem", fontWeight: 700, borderBottom: "2px solid var(--border)" }}>Tháng</th>
                            <th style={{ textAlign: "right", padding: "8px 6px", fontSize: ".76rem", fontWeight: 700, borderBottom: "2px solid var(--border)", color: "var(--green)" }}>Thu vào</th>
                            <th style={{ textAlign: "right", padding: "8px 6px", fontSize: ".76rem", fontWeight: 700, borderBottom: "2px solid var(--border)", color: "var(--red)" }}>Chi ra</th>
                            <th style={{ textAlign: "right", padding: "8px 6px", fontSize: ".76rem", fontWeight: 700, borderBottom: "2px solid var(--border)" }}>Chênh lệch</th>
                        </tr></thead>
                        <tbody>{monthly.map((m, i) => (
                            <tr key={i}>
                                <td style={{ padding: "10px 6px", fontSize: ".85rem", fontWeight: 600, borderBottom: "1px solid var(--border-light)" }}>{m.month}</td>
                                <td style={{ textAlign: "right", padding: "10px 6px", fontSize: ".85rem", fontFamily: "var(--font-mono)", color: "var(--green)", borderBottom: "1px solid var(--border-light)" }}>{m.income ? "+" + fmtVND(m.income) : "—"}</td>
                                <td style={{ textAlign: "right", padding: "10px 6px", fontSize: ".85rem", fontFamily: "var(--font-mono)", color: "var(--red)", borderBottom: "1px solid var(--border-light)" }}>{m.expense ? "−" + fmtVND(m.expense) : "—"}</td>
                                <td style={{ textAlign: "right", padding: "10px 6px", fontSize: ".85rem", fontFamily: "var(--font-mono)", fontWeight: 700, color: m.net >= 0 ? "var(--green)" : "var(--red)", borderBottom: "1px solid var(--border-light)" }}>{m.net >= 0 ? "+" : ""}{fmtVND(m.net)}</td>
                            </tr>
                        ))}</tbody>
                    </table>
                </div>
            </div>

            {/* Transaction ledger */}
            <div className="card card-glow fade-up" style={{ animationDelay: ".1s" }}>
                <div className="card-header">
                    <span className="card-title">Sổ quỹ chi tiết</span>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        {[{ id: "all", label: "Tất cả" }, { id: "cash", label: "💵 TM" }, { id: "bank", label: "🏦 NH" }, { id: "ewallet", label: "📱 Ví" }].map(t => (
                            <button key={t.id} style={tabStyle(tab === t.id)} onClick={() => setTab(t.id)}>{t.label}</button>
                        ))}
                    </div>
                </div>
                <div className="card-body" style={{ padding: 0, overflow: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 600 }}>
                        <thead><tr>
                            <th style={{ textAlign: "left", padding: "10px 14px", fontSize: ".72rem", fontWeight: 700, borderBottom: "2px solid var(--border)", background: "var(--bg-elevated)" }}>Ngày</th>
                            <th style={{ textAlign: "left", padding: "10px 14px", fontSize: ".72rem", fontWeight: 700, borderBottom: "2px solid var(--border)", background: "var(--bg-elevated)" }}>Diễn giải</th>
                            <th style={{ textAlign: "center", padding: "10px 14px", fontSize: ".72rem", fontWeight: 700, borderBottom: "2px solid var(--border)", background: "var(--bg-elevated)" }}>PT</th>
                            <th style={{ textAlign: "right", padding: "10px 14px", fontSize: ".72rem", fontWeight: 700, borderBottom: "2px solid var(--border)", background: "var(--bg-elevated)", color: "var(--green)" }}>Thu vào</th>
                            <th style={{ textAlign: "right", padding: "10px 14px", fontSize: ".72rem", fontWeight: 700, borderBottom: "2px solid var(--border)", background: "var(--bg-elevated)", color: "var(--red)" }}>Chi ra</th>
                            <th style={{ textAlign: "right", padding: "10px 14px", fontSize: ".72rem", fontWeight: 700, borderBottom: "2px solid var(--border)", background: "var(--bg-elevated)" }}>Số dư</th>
                        </tr></thead>
                        <tbody>
                            <tr style={{ background: "var(--bg-warm)" }}><td colSpan={5} style={{ padding: "8px 14px", fontSize: ".82rem", fontWeight: 700 }}>Số dư đầu kỳ</td><td style={{ textAlign: "right", padding: "8px 14px", fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: ".85rem" }}>{fmtVND(openBal)}</td></tr>
                            {rows.length === 0 ? (
                                <tr><td colSpan={6} style={{ textAlign: "center", padding: 30, color: "var(--text-tertiary)" }}>Chưa có giao dịch {tab !== "all" ? "cho phương thức này" : ""}</td></tr>
                            ) : rows.map((r, i) => (
                                <tr key={r.id} style={{ borderBottom: "1px solid var(--border-light)" }}>
                                    <td style={{ padding: "8px 14px", fontSize: ".82rem", whiteSpace: "nowrap" }}>{fmtDate(r.tx_date)}</td>
                                    <td style={{ padding: "8px 14px", fontSize: ".82rem" }}>{r.description}{r.counterparty ? <span style={{ color: "var(--text-tertiary)", fontSize: ".72rem" }}> ({r.counterparty})</span> : ""}</td>
                                    <td style={{ textAlign: "center", padding: "8px 6px", fontSize: ".72rem" }}>{r.payment_method === "cash" ? "💵" : r.payment_method === "bank_transfer" ? "🏦" : "📱"}</td>
                                    <td style={{ textAlign: "right", padding: "8px 14px", fontFamily: "var(--font-mono)", fontSize: ".82rem", color: r.inAmt ? "var(--green)" : "transparent" }}>{r.inAmt ? "+" + fmtVND(r.inAmt) : ""}</td>
                                    <td style={{ textAlign: "right", padding: "8px 14px", fontFamily: "var(--font-mono)", fontSize: ".82rem", color: r.outAmt ? "var(--red)" : "transparent" }}>{r.outAmt ? "−" + fmtVND(r.outAmt) : ""}</td>
                                    <td style={{ textAlign: "right", padding: "8px 14px", fontFamily: "var(--font-mono)", fontSize: ".82rem", fontWeight: 600 }}>{fmtVND(r.balance)}</td>
                                </tr>
                            ))}
                            <tr style={{ background: "var(--bg-elevated)", fontWeight: 700 }}>
                                <td colSpan={3} style={{ padding: "10px 14px", fontSize: ".82rem" }}>Số dư cuối kỳ</td>
                                <td style={{ textAlign: "right", padding: "10px 14px", fontFamily: "var(--font-mono)", fontSize: ".85rem", color: "var(--green)" }}>{fmtVND(totalIn)}</td>
                                <td style={{ textAlign: "right", padding: "10px 14px", fontFamily: "var(--font-mono)", fontSize: ".85rem", color: "var(--red)" }}>{fmtVND(totalOut)}</td>
                                <td style={{ textAlign: "right", padding: "10px 14px", fontFamily: "var(--font-mono)", fontSize: ".95rem", fontWeight: 800 }}>{fmtVND(endBal)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>);
}

// ═══════════════════════════════════════════════════════════════════════════════
// TAX CALENDAR PAGE — Lịch thuế & Deadline
// ═══════════════════════════════════════════════════════════════════════════════
const TAX_DEADLINES_2026 = [
    // Q1
    { date: "2026-01-30", type: "declare", label: "Hạn nộp tờ khai lệ phí môn bài (nếu có)", note: "Đã bỏ LPMB từ 2025, không áp dụng", done: true },
    { date: "2026-01-30", type: "pay", label: "Hạn nộp thuế GTGT + TNCN tháng 12/2025", note: "Áp dụng HKD kê khai tháng" },
    { date: "2026-04-30", type: "declare", label: "Hạn nộp tờ khai thuế GTGT + TNCN Quý 1/2026", note: "Mẫu 01/CNKD theo TT152/2025/TT-BTC", important: true },
    { date: "2026-04-30", type: "pay", label: "Hạn nộp tiền thuế GTGT + TNCN Quý 1/2026", note: "Nộp qua eTax Mobile hoặc ngân hàng", important: true },
    { date: "2026-04-30", type: "ledger", label: "Hoàn thành sổ kế toán Q1/2026", note: "S1a hoặc S2b-S2e tùy nhóm", important: true },
    // Q2
    { date: "2026-07-30", type: "declare", label: "Hạn nộp tờ khai thuế GTGT + TNCN Quý 2/2026", note: "Mẫu 01/CNKD" },
    { date: "2026-07-30", type: "pay", label: "Hạn nộp tiền thuế GTGT + TNCN Quý 2/2026", note: "" },
    // Q3
    { date: "2026-10-30", type: "declare", label: "Hạn nộp tờ khai thuế GTGT + TNCN Quý 3/2026", note: "Mẫu 01/CNKD" },
    { date: "2026-10-30", type: "pay", label: "Hạn nộp tiền thuế GTGT + TNCN Quý 3/2026", note: "" },
    // Q4 / Quyết toán năm
    { date: "2027-01-30", type: "declare", label: "Hạn nộp tờ khai thuế GTGT + TNCN Quý 4/2026", note: "Mẫu 01/CNKD" },
    { date: "2027-01-30", type: "pay", label: "Hạn nộp tiền thuế GTGT + TNCN Quý 4/2026", note: "" },
    { date: "2027-03-31", type: "declare", label: "Hạn nộp quyết toán thuế TNCN năm 2026", note: "Chỉ áp dụng HKD có yêu cầu quyết toán", important: true },
];

function TaxCalendarPage({ business, addToast }) {
    const today = new Date().toISOString().split("T")[0];
    const [checkedIds, setCheckedIds] = useState(() => {
        // Auto-check items already past + done
        return TAX_DEADLINES_2026.filter(d => d.done || d.date < today).map((_, i) => i);
    });
    const toggle = (idx) => setCheckedIds(p => p.includes(idx) ? p.filter(i => i !== idx) : [...p, idx]);

    const upcoming = TAX_DEADLINES_2026.filter((d, i) => d.date >= today && !checkedIds.includes(i));
    const nextDeadline = upcoming[0];
    const daysUntil = nextDeadline ? Math.ceil((new Date(nextDeadline.date) - new Date(today)) / (1000 * 60 * 60 * 24)) : null;

    const typeIcon = { declare: "📋", pay: "💰", ledger: "📗" };
    const typeColor = { declare: "var(--blue)", pay: "var(--accent)", ledger: "var(--green)" };
    const typeLabel = { declare: "Tờ khai", pay: "Nộp tiền", ledger: "Sổ sách" };

    return (<>
        <div className="page-header"><div><h1 className="page-title">Lịch thuế 2026</h1><p className="page-subtitle">Hạn nộp tờ khai, nộp tiền & nhắc việc quan trọng</p></div></div>
        <div className="page-body">
            {/* Alert banner */}
            {nextDeadline && (
                <div className="card card-glow fade-up" style={{ marginBottom: 20, overflow: "hidden" }}>
                    <div style={{ padding: "20px 24px", background: daysUntil <= 7 ? "linear-gradient(135deg,#fee2e2,#fef2f2)" : daysUntil <= 30 ? "linear-gradient(135deg,#fef3c7,#fffbeb)" : "linear-gradient(135deg,#dbeafe,#eff6ff)", borderLeft: `4px solid ${daysUntil <= 7 ? "var(--red)" : daysUntil <= 30 ? "#f59e0b" : "var(--blue)"}` }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                            <div style={{ width: 56, height: 56, borderRadius: "var(--radius-md)", background: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.8rem", boxShadow: "var(--shadow-sm)" }}>{daysUntil <= 7 ? "🚨" : daysUntil <= 30 ? "⏰" : "📅"}</div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 800, fontSize: "1rem", color: daysUntil <= 7 ? "var(--red)" : daysUntil <= 30 ? "#b45309" : "var(--blue)" }}>
                                    {daysUntil <= 0 ? "HẾT HẠN HÔM NAY!" : daysUntil <= 7 ? `Còn ${daysUntil} ngày — SẮP HẾT HẠN` : daysUntil <= 30 ? `Còn ${daysUntil} ngày` : `Còn ${daysUntil} ngày`}
                                </div>
                                <div style={{ fontSize: ".88rem", marginTop: 4, fontWeight: 600 }}>{nextDeadline.label}</div>
                                <div style={{ fontSize: ".78rem", color: "var(--text-tertiary)", marginTop: 2 }}>Hạn: {fmtDate(nextDeadline.date)} {nextDeadline.note ? `— ${nextDeadline.note}` : ""}</div>
                            </div>
                            <div style={{ textAlign: "right", flexShrink: 0 }}>
                                <div style={{ fontSize: "2rem", fontWeight: 800, fontFamily: "var(--font-mono)", color: daysUntil <= 7 ? "var(--red)" : "var(--text-primary)" }}>{daysUntil}</div>
                                <div style={{ fontSize: ".68rem", color: "var(--text-tertiary)", fontWeight: 600 }}>ngày</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Summary cards */}
            <div className="stat-grid" style={{ marginBottom: 20 }}>
                <div className="stat-card"><div className="stat-label">📋 Tờ khai còn lại</div><div className="stat-value" style={{ color: "var(--blue)" }}>{TAX_DEADLINES_2026.filter((d, i) => d.type === "declare" && !checkedIds.includes(i)).length}</div></div>
                <div className="stat-card"><div className="stat-label">💰 Khoản phải nộp</div><div className="stat-value" style={{ color: "var(--accent)" }}>{TAX_DEADLINES_2026.filter((d, i) => d.type === "pay" && !checkedIds.includes(i)).length}</div></div>
                <div className="stat-card"><div className="stat-label">📗 Sổ sách cần làm</div><div className="stat-value" style={{ color: "var(--green)" }}>{TAX_DEADLINES_2026.filter((d, i) => d.type === "ledger" && !checkedIds.includes(i)).length}</div></div>
                <div className="stat-card"><div className="stat-label">✅ Đã hoàn thành</div><div className="stat-value">{checkedIds.length}/{TAX_DEADLINES_2026.length}</div></div>
            </div>

            {/* Timeline */}
            <div className="card card-glow fade-up" style={{ animationDelay: ".1s" }}>
                <div className="card-header"><span className="card-title">Dòng thời gian thuế</span></div>
                <div className="card-body" style={{ padding: "8px 20px" }}>
                    {TAX_DEADLINES_2026.map((d, i) => {
                        const checked = checkedIds.includes(i);
                        const isPast = d.date < today;
                        const isUrgent = !checked && daysUntil !== null && d.date === nextDeadline?.date;
                        const dline = new Date(d.date + "T00:00:00");
                        const qLabel = dline.getMonth() < 3 ? "Q1" : dline.getMonth() < 6 ? "Q2" : dline.getMonth() < 9 ? "Q3" : "Q4";
                        const showQHeader = i === 0 || TAX_DEADLINES_2026[i - 1] && new Date(TAX_DEADLINES_2026[i - 1].date + "T00:00:00").getMonth() !== dline.getMonth() - ((dline.getMonth() % 3) || 0);

                        return (<div key={i}>
                            <div onClick={() => toggle(i)} style={{ display: "flex", gap: 14, padding: "14px 4px", borderBottom: "1px solid var(--border-light)", cursor: "pointer", alignItems: "flex-start", opacity: checked ? .55 : 1, transition: "all .15s" }}>
                                {/* Checkbox */}
                                <div style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${checked ? "var(--green)" : isUrgent ? "var(--red)" : "var(--border)"}`, background: checked ? "var(--green)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2, transition: "all .15s" }}>
                                    {checked && <span style={{ color: "white", fontSize: ".7rem", fontWeight: 800 }}>✓</span>}
                                </div>
                                {/* Icon + type */}
                                <div style={{ width: 34, height: 34, borderRadius: "var(--radius-sm)", background: checked ? "var(--bg-elevated)" : `${typeColor[d.type]}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", flexShrink: 0 }}>{typeIcon[d.type]}</div>
                                {/* Content */}
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                                        <span style={{ fontSize: ".7rem", fontWeight: 700, padding: "2px 8px", borderRadius: 10, background: `${typeColor[d.type]}18`, color: typeColor[d.type] }}>{typeLabel[d.type]}</span>
                                        {d.important && !checked && <span style={{ fontSize: ".65rem", fontWeight: 700, padding: "2px 6px", borderRadius: 10, background: "var(--red)", color: "white" }}>Quan trọng</span>}
                                        {isUrgent && <span style={{ fontSize: ".65rem", fontWeight: 700, padding: "2px 6px", borderRadius: 10, background: "var(--red)", color: "white", animation: "pulse 1.5s infinite" }}>⚡ Sắp đến hạn</span>}
                                    </div>
                                    <div style={{ fontWeight: 600, fontSize: ".88rem", marginTop: 4, textDecoration: checked ? "line-through" : "none" }}>{d.label}</div>
                                    {d.note && <div style={{ fontSize: ".75rem", color: "var(--text-tertiary)", marginTop: 2 }}>{d.note}</div>}
                                </div>
                                {/* Date */}
                                <div style={{ textAlign: "right", flexShrink: 0 }}>
                                    <div style={{ fontSize: ".82rem", fontWeight: 700, fontFamily: "var(--font-mono)", color: isUrgent ? "var(--red)" : "var(--text-secondary)" }}>{fmtDate(d.date)}</div>
                                    <div style={{ fontSize: ".68rem", color: "var(--text-tertiary)" }}>{qLabel}/{dline.getFullYear()}</div>
                                </div>
                            </div>
                        </div>);
                    })}
                </div>
            </div>

            {/* Note */}
            <div style={{ marginTop: 16, padding: "14px 18px", background: "var(--bg-elevated)", borderRadius: "var(--radius-md)", fontSize: ".78rem", color: "var(--text-tertiary)", display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ fontSize: "1rem" }}>📌</span>
                <div style={{ lineHeight: 1.6 }}>
                    <strong>Lưu ý:</strong> Hạn nộp có thể dời nếu trùng ngày nghỉ/lễ. Nếu HKD doanh thu ≤ 500 triệu/năm thì <strong>miễn kê khai VAT + TNCN</strong> nhưng vẫn cần nộp sổ S1a-HKD. Kiểm tra thông báo từ Chi cục thuế địa phương để cập nhật chính xác nhất.
                </div>
            </div>
        </div>
    </>);
}

// ═══════════════════════════════════════════════════════════════════════════════
// SUPPORT PAGE — Trung tâm hỗ trợ
// ═══════════════════════════════════════════════════════════════════════════════
const TAX_FAQ = [
    { q: "HKD doanh thu dưới 500 triệu có phải nộp thuế không?", a: "Không. Theo Luật 109/2025/QH15, hộ kinh doanh có doanh thu hàng năm ≤ 500 triệu đồng được miễn thuế GTGT và thuế TNCN. Tuy nhiên vẫn cần ghi sổ doanh thu S1a-HKD." },
    { q: "Sổ sách HKD cần lưu giữ bao lâu?", a: "Theo quy định, sổ kế toán và chứng từ gốc phải lưu giữ tối thiểu 5 năm kể từ khi kết thúc năm tài chính. Hóa đơn lưu tối thiểu 10 năm." },
    { q: "Chi phí không có hóa đơn có được khấu trừ không?", a: "Không. Chỉ chi phí có hóa đơn hoặc chứng từ hợp lệ mới được khấu trừ khi tính thuế TNCN theo phương pháp lợi nhuận. Nên yêu cầu hóa đơn cho mọi khoản chi từ 200.000đ trở lên." },
    { q: "HKD có phải đăng ký mã số thuế không?", a: "Có. Mọi hộ kinh doanh đều phải đăng ký và sử dụng mã số thuế khi kinh doanh. MST được cấp khi đăng ký hộ kinh doanh tại UBND cấp quận/huyện." },
    { q: "Cách tính thuế TNCN theo % doanh thu khác gì so với lợi nhuận?", a: "Theo % doanh thu: Thuế = Tỷ lệ cố định × (Doanh thu − 500 triệu). Đơn giản nhưng không tính chi phí. Theo lợi nhuận: Thuế = Thuế suất × (Doanh thu − Chi phí hợp lý). Chính xác hơn nhưng cần sổ sách chi tiết (S2b–S2e)." },
    { q: "Tỷ lệ thuế GTGT cho từng ngành nghề là bao nhiêu?", a: "Phân phối hàng hóa: 1%. Dịch vụ, xây dựng: 5%. Sản xuất, vận tải, kho bãi: 3%. Hoạt động khác: 2%. Áp dụng cho HKD doanh thu > 500 triệu." },
    { q: "HKD có cần phần mềm kế toán bắt buộc không?", a: "Không bắt buộc. HKD có thể ghi sổ sách thủ công hoặc dùng phần mềm. HKD Tax giúp tự động hóa quy trình này theo đúng mẫu TT152/2025/TT-BTC." },
    { q: "Bị phạt bao nhiêu nếu nộp chậm tờ khai hoặc thuế?", a: "Nộp chậm tờ khai: Phạt 2-5 triệu đồng. Nộp chậm tiền thuế: Phạt 0.03%/ngày trên số tiền chậm nộp. Trốn thuế: Phạt 1-3 lần số thuế trốn + truy thu." },
];

const GUIDE_VIDEOS = [
    { title: "Hướng dẫn ghi nhận thu chi", desc: "Cách thêm giao dịch thu/chi, đính kèm hóa đơn ảnh", icon: "📝", duration: "3 phút" },
    { title: "Cài đặt hồ sơ thuế", desc: "Chọn ngưỡng doanh thu, phương pháp tính thuế phù hợp", icon: "⚙️", duration: "2 phút" },
    { title: "Xuất sổ kế toán để nộp thuế", desc: "In sổ S1a, S2b-S2e theo đúng mẫu TT152", icon: "🖨️", duration: "4 phút" },
    { title: "Tạo và quản lý hóa đơn bán hàng", desc: "Tạo HĐ Mẫu 6A, in, gửi cho khách hàng", icon: "🧾", duration: "3 phút" },
    { title: "Import sao kê ngân hàng & đối soát", desc: "Upload CSV sao kê và ghép với giao dịch trong app", icon: "🏦", duration: "5 phút" },
    { title: "Sao lưu & khôi phục dữ liệu", desc: "Xuất Excel backup và import lại khi cần", icon: "💾", duration: "2 phút" },
];

function SupportPage({ addToast }) {
    const [openFaq, setOpenFaq] = useState(null);
    const [searchQ, setSearchQ] = useState("");

    const filteredFaq = searchQ.trim() ? TAX_FAQ.filter(f => f.q.toLowerCase().includes(searchQ.toLowerCase()) || f.a.toLowerCase().includes(searchQ.toLowerCase())) : TAX_FAQ;

    return (<>
        <div className="page-header"><div><h1 className="page-title">Trung tâm hỗ trợ</h1><p className="page-subtitle">Hướng dẫn sử dụng, hỏi đáp thuế & liên hệ hỗ trợ</p></div></div>
        <div className="page-body">

            {/* Quick links */}
            <div className="stat-grid" style={{ marginBottom: 20 }}>
                {[
                    { icon: "📖", label: "Video hướng dẫn", desc: `${GUIDE_VIDEOS.length} bài`, color: "var(--blue)", bg: "var(--blue-light)", section: "video" },
                    { icon: "❓", label: "Hỏi đáp thuế", desc: `${TAX_FAQ.length} câu hỏi`, color: "var(--accent)", bg: "var(--accent-light)", section: "faq" },
                    { icon: "📞", label: "Liên hệ hỗ trợ", desc: "Hotline & Email", color: "var(--green)", bg: "var(--green-light)", section: "contact" },
                    { icon: "📋", label: "Văn bản pháp luật", desc: "TT152, NĐ123...", color: "#8e44ad", bg: "#f4ecf7", section: "legal" },
                ].map((c, i) => (
                    <div key={i} className="stat-card" style={{ cursor: "pointer" }} onClick={() => { const el = document.getElementById(`support-${c.section}`); el?.scrollIntoView({ behavior: "smooth" }) }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <div style={{ width: 40, height: 40, borderRadius: "var(--radius-sm)", background: c.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem" }}>{c.icon}</div>
                            <div><div className="stat-label" style={{ marginBottom: 2 }}>{c.label}</div><div style={{ fontSize: ".72rem", color: "var(--text-tertiary)" }}>{c.desc}</div></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Video guides */}
            <div id="support-video" className="card card-glow fade-up" style={{ marginBottom: 20 }}>
                <div className="card-header"><span className="card-title">📖 Video hướng dẫn</span></div>
                <div className="card-body" style={{ padding: "8px 20px" }}>
                    {GUIDE_VIDEOS.map((v, i) => (
                        <div key={i} style={{ display: "flex", gap: 14, padding: "14px 4px", borderBottom: i < GUIDE_VIDEOS.length - 1 ? "1px solid var(--border-light)" : "none", alignItems: "center", cursor: "pointer", transition: "all .15s" }}
                            onClick={() => addToast({ type: "success", title: "Sắp có!", detail: `Video "${v.title}" đang được sản xuất` })}>
                            <div style={{ width: 46, height: 46, borderRadius: "var(--radius-md)", background: "var(--blue-light)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", flexShrink: 0 }}>{v.icon}</div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 600, fontSize: ".88rem" }}>{v.title}</div>
                                <div style={{ fontSize: ".75rem", color: "var(--text-tertiary)", marginTop: 2 }}>{v.desc}</div>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                                <span style={{ fontSize: ".72rem", color: "var(--text-tertiary)", fontFamily: "var(--font-mono)" }}>{v.duration}</span>
                                <span style={{ color: "var(--blue)", fontSize: ".82rem" }}>▶</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* FAQ */}
            <div id="support-faq" className="card card-glow fade-up" style={{ marginBottom: 20, animationDelay: ".1s" }}>
                <div className="card-header">
                    <span className="card-title">❓ Hỏi đáp thuế HKD</span>
                    <div style={{ position: "relative", maxWidth: 240 }}>
                        <input className="field-input" placeholder="Tìm câu hỏi..." value={searchQ} onChange={e => setSearchQ(e.target.value)} style={{ padding: "6px 12px 6px 30px", fontSize: ".78rem" }} />
                        <span style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", fontSize: ".82rem", color: "var(--text-tertiary)" }}>🔍</span>
                    </div>
                </div>
                <div className="card-body" style={{ padding: "4px 20px" }}>
                    {filteredFaq.length === 0 ? (
                        <div style={{ textAlign: "center", padding: 30, color: "var(--text-tertiary)" }}>Không tìm thấy kết quả cho "{searchQ}"</div>
                    ) : filteredFaq.map((f, i) => {
                        const isOpen = openFaq === i;
                        return (<div key={i} style={{ borderBottom: "1px solid var(--border-light)" }}>
                            <div onClick={() => setOpenFaq(isOpen ? null : i)} style={{ display: "flex", gap: 12, padding: "14px 4px", cursor: "pointer", alignItems: "center" }}>
                                <div style={{ width: 28, height: 28, borderRadius: "50%", background: isOpen ? "var(--accent)" : "var(--bg-elevated)", color: isOpen ? "white" : "var(--text-tertiary)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".72rem", fontWeight: 700, flexShrink: 0, transition: "all .15s" }}>{isOpen ? "−" : "+"}</div>
                                <div style={{ flex: 1, fontWeight: 600, fontSize: ".88rem", color: isOpen ? "var(--accent)" : "var(--text-primary)" }}>{f.q}</div>
                            </div>
                            {isOpen && (
                                <div style={{ padding: "0 4px 16px 44px", fontSize: ".85rem", color: "var(--text-secondary)", lineHeight: 1.7, animation: "fadeUp .2s ease" }}>{f.a}</div>
                            )}
                        </div>);
                    })}
                </div>
            </div>

            {/* Contact */}
            <div id="support-contact" className="card card-glow fade-up" style={{ marginBottom: 20, animationDelay: ".15s" }}>
                <div className="card-header"><span className="card-title">📞 Liên hệ hỗ trợ</span></div>
                <div className="card-body">
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 16 }}>
                        {[
                            { icon: "📞", title: "Hotline thuế", value: "1900 6148", desc: "Tổng đài hỗ trợ NNT (miễn phí)", color: "var(--green)" },
                            { icon: "🌐", title: "Cổng thuế điện tử", value: "thuedientu.gdt.gov.vn", desc: "Nộp tờ khai & tra cứu MST", color: "var(--blue)" },
                            { icon: "📱", title: "eTax Mobile", value: "App Store / Google Play", desc: "Nộp thuế qua điện thoại", color: "var(--accent)" },
                            { icon: "🏢", title: "Chi cục thuế", value: "Liên hệ địa phương", desc: "Hỗ trợ trực tiếp tại quầy", color: "#8e44ad" },
                        ].map((c, i) => (
                            <div key={i} style={{ padding: "18px 20px", borderRadius: "var(--radius-md)", border: "1px solid var(--border)", background: "var(--bg-card)" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                                    <span style={{ fontSize: "1.3rem" }}>{c.icon}</span>
                                    <span style={{ fontWeight: 700, fontSize: ".88rem" }}>{c.title}</span>
                                </div>
                                <div style={{ fontWeight: 700, fontSize: "1rem", color: c.color, marginBottom: 4, fontFamily: "var(--font-mono)" }}>{c.value}</div>
                                <div style={{ fontSize: ".75rem", color: "var(--text-tertiary)" }}>{c.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Legal references */}
            <div id="support-legal" className="card card-glow fade-up" style={{ animationDelay: ".2s" }}>
                <div className="card-header"><span className="card-title">📋 Văn bản pháp luật áp dụng</span></div>
                <div className="card-body" style={{ padding: "12px 20px" }}>
                    {[
                        { code: "TT 152/2025/TT-BTC", title: "Thông tư hướng dẫn chế độ kế toán cho HKD", date: "31/12/2025", note: "Mẫu sổ S1a, S2a–S2e" },
                        { code: "Luật 109/2025/QH15", title: "Luật Thuế thu nhập cá nhân sửa đổi", date: "2025", note: "Ngưỡng miễn thuế 500 triệu" },
                        { code: "NĐ 123/2020/NĐ-CP", title: "Nghị định về hóa đơn, chứng từ", date: "19/10/2020", note: "Mẫu 6A hóa đơn bán hàng HKD" },
                        { code: "TT 78/2021/TT-BTC", title: "Thông tư hướng dẫn NĐ123 về hóa đơn điện tử", date: "17/09/2021", note: "Ký hiệu, số thứ tự HĐ" },
                        { code: "Luật Quản lý thuế 2019", title: "Luật số 38/2019/QH14 về quản lý thuế", date: "13/06/2019", note: "Quy định chung về kê khai, nộp thuế" },
                    ].map((d, i) => (
                        <div key={i} style={{ display: "flex", gap: 14, padding: "12px 4px", borderBottom: i < 4 ? "1px solid var(--border-light)" : "none", alignItems: "flex-start" }}>
                            <div style={{ minWidth: 130, fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: ".78rem", color: "var(--accent)" }}>{d.code}</div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 600, fontSize: ".85rem" }}>{d.title}</div>
                                <div style={{ fontSize: ".72rem", color: "var(--text-tertiary)", marginTop: 2 }}>{d.note} · Ban hành: {d.date}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </>);
}

// ═══════════════════════════════════════════════════════════════════════════════
// LOGIN SCREEN
// ═══════════════════════════════════════════════════════════════════════════════
function LoginScreen({ onAuth }) {
    const [mode, setMode] = useState("login"); // login | signup | reset
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [showPw, setShowPw] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); setSuccess(null); setLoading(true);
        try {
            const { signInWithEmail, signUpWithEmail, resetPassword } = await import('./lib/auth');
            if (mode === "login") {
                const { error: err } = await signInWithEmail(email, password);
                if (err) throw err;
            } else if (mode === "signup") {
                const { data, error: err } = await signUpWithEmail(email, password);
                if (err) throw err;
                // If email confirmation is required
                if (data?.user && !data?.session) {
                    setSuccess("Đã gửi email xác nhận! Vui lòng kiểm tra hộp thư.");
                    setMode("login");
                }
            } else {
                const { error: err } = await resetPassword(email);
                if (err) throw err;
                setSuccess("Đã gửi link đặt lại mật khẩu! Kiểm tra hộp thư.");
                setMode("login");
            }
        } catch (err) {
            setError(err.message || "Đã xảy ra lỗi");
        } finally {
            setLoading(false);
        }
    };

    const loginStyles = `
    .login-container{display:flex;align-items:center;justify-content:center;min-height:100vh;background:var(--bg);padding:20px;}
    .login-card{width:100%;max-width:420px;background:var(--bg-card);border-radius:var(--radius-xl);box-shadow:var(--shadow-xl);overflow:hidden;}
    .login-header{background:var(--bg-sidebar);padding:40px 32px 32px;text-align:center;position:relative;}
    .login-header::after{content:'';position:absolute;bottom:-1px;left:0;right:0;height:4px;background:linear-gradient(90deg,var(--accent),var(--yellow),var(--accent));}
    .login-logo{width:64px;height:64px;border-radius:var(--radius-lg);margin:0 auto 16px;box-shadow:0 4px 20px rgba(232,93,44,.3);}
    .login-title{color:var(--text-inverse);font-size:1.5rem;font-weight:700;margin-bottom:4px;}
    .login-subtitle{color:var(--text-sidebar);font-size:.85rem;opacity:.8;}
    .login-body{padding:32px;}
    .login-tabs{display:flex;gap:4px;background:var(--bg-elevated);border-radius:var(--radius-md);padding:4px;margin-bottom:24px;}
    .login-tab{flex:1;padding:10px;border:none;background:transparent;border-radius:var(--radius-sm);font-family:var(--font);font-size:.85rem;font-weight:500;color:var(--text-secondary);cursor:pointer;transition:all .2s;}
    .login-tab.active{background:var(--bg-card);color:var(--accent);box-shadow:var(--shadow-sm);font-weight:600;}
    .login-field{margin-bottom:16px;}
    .login-label{display:block;font-size:.8rem;font-weight:600;color:var(--text-secondary);margin-bottom:6px;text-transform:uppercase;letter-spacing:.5px;}
    .login-input{width:100%;padding:12px 16px;border:1.5px solid var(--border);border-radius:var(--radius-md);font-family:var(--font);font-size:.95rem;background:var(--bg);color:var(--text-primary);transition:all .2s;outline:none;}
    .login-input:focus{border-color:var(--accent);box-shadow:0 0 0 3px var(--accent-glow);}
    .login-input-wrap{position:relative;}
    .login-pw-toggle{position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:none;color:var(--text-tertiary);cursor:pointer;padding:4px;font-size:1.1rem;}
    .login-btn{width:100%;padding:14px;border:none;border-radius:var(--radius-md);background:linear-gradient(135deg,var(--accent),var(--accent-hover));color:#fff;font-family:var(--font);font-size:1rem;font-weight:600;cursor:pointer;transition:all .2s;position:relative;overflow:hidden;}
    .login-btn:hover{transform:translateY(-1px);box-shadow:0 4px 16px rgba(232,93,44,.3);}
    .login-btn:active{transform:translateY(0);}
    .login-btn:disabled{opacity:.6;cursor:not-allowed;transform:none;}
    .login-btn .spinner{display:inline-block;width:18px;height:18px;border:2px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:spin 1s linear infinite;vertical-align:middle;margin-right:8px;}
    .login-error{background:var(--red-light);color:var(--red);padding:10px 14px;border-radius:var(--radius-sm);font-size:.85rem;margin-bottom:16px;border-left:3px solid var(--red);}
    .login-success{background:var(--green-light);color:var(--green);padding:10px 14px;border-radius:var(--radius-sm);font-size:.85rem;margin-bottom:16px;border-left:3px solid var(--green);}
    .login-link{background:none;border:none;color:var(--accent);font-family:var(--font);font-size:.85rem;cursor:pointer;padding:0;text-decoration:underline;text-underline-offset:2px;}
    .login-footer{text-align:center;margin-top:16px;color:var(--text-tertiary);font-size:.8rem;}
    `;

    return (<><style>{STYLES}{loginStyles}</style>
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <img src={HKDTAX_LOGO} alt="HKD Tax" className="login-logo" />
                    <div className="login-title">HKD Tax 2026</div>
                    <div className="login-subtitle">Quản lý thuế Hộ Kinh Doanh</div>
                </div>
                <div className="login-body">
                    {mode !== "reset" && (
                        <div className="login-tabs">
                            <button className={`login-tab ${mode === "login" ? "active" : ""}`} onClick={() => { setMode("login"); setError(null); setSuccess(null); }}>Đăng nhập</button>
                            <button className={`login-tab ${mode === "signup" ? "active" : ""}`} onClick={() => { setMode("signup"); setError(null); setSuccess(null); }}>Đăng ký</button>
                        </div>
                    )}
                    {mode === "reset" && (
                        <div style={{ marginBottom: 20 }}>
                            <button className="login-link" onClick={() => { setMode("login"); setError(null); setSuccess(null); }}>← Quay lại đăng nhập</button>
                            <div style={{ fontSize: ".9rem", color: "var(--text-secondary)", marginTop: 12 }}>Nhập email để nhận link đặt lại mật khẩu</div>
                        </div>
                    )}
                    {error && <div className="login-error">{error}</div>}
                    {success && <div className="login-success">{success}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="login-field">
                            <label className="login-label">Email</label>
                            <input className="login-input" type="email" placeholder="email@example.com" value={email} onChange={e => setEmail(e.target.value)} required autoFocus />
                        </div>
                        {mode !== "reset" && (
                            <div className="login-field">
                                <label className="login-label">Mật khẩu</label>
                                <div className="login-input-wrap">
                                    <input className="login-input" type={showPw ? "text" : "password"} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} style={{ paddingRight: 44 }} />
                                    <button type="button" className="login-pw-toggle" onClick={() => setShowPw(!showPw)}>{showPw ? "🙈" : "👁️"}</button>
                                </div>
                            </div>
                        )}
                        {mode === "login" && (
                            <div style={{ textAlign: "right", marginBottom: 16 }}>
                                <button type="button" className="login-link" onClick={() => { setMode("reset"); setError(null); setSuccess(null); }}>Quên mật khẩu?</button>
                            </div>
                        )}
                        <button className="login-btn" type="submit" disabled={loading}>
                            {loading && <span className="spinner" />}
                            {mode === "login" ? "Đăng nhập" : mode === "signup" ? "Đăng ký" : "Gửi link đặt lại"}
                        </button>
                    </form>
                    <div className="login-footer">
                        {mode === "login" ? (
                            <>Chưa có tài khoản? <button className="login-link" onClick={() => { setMode("signup"); setError(null); }}>Đăng ký ngay</button></>
                        ) : mode === "signup" ? (
                            <>Đã có tài khoản? <button className="login-link" onClick={() => { setMode("login"); setError(null); }}>Đăng nhập</button></>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    </>);
}

// ═══════════════════════════════════════════════════════════════════════════════
// APP ROOT
// ═══════════════════════════════════════════════════════════════════════════════
export default function App() {
    const [session, setSession] = useState(null);
    const [authChecked, setAuthChecked] = useState(false);
    const [loading, setLoading] = useState(true);
    const [onboarded, setOnboarded] = useState(false);
    const [page, setPage] = useState("dashboard");
    const [showAddTx, setShowAddTx] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [business, setBusiness] = useState(DEFAULT_BUSINESS);
    const [inventory, setInventory] = useState([]);
    const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
    const [wallets, setWallets] = useState(DEFAULT_WALLETS);
    const [invoices, setInvoices] = useState([]);
    const [txRiskFilter, setTxRiskFilter] = useState(null);
    const { toasts, addToast } = useToast();
    const riskFlags = useMemo(() => getRiskFlags(transactions), [transactions]);
    const unrec = useMemo(() => transactions.filter(t => !t.reconciled && t.payment_method === "bank_transfer").length, [transactions]);

    // ─── Auth state listener ─────────────────────────────────────────────
    useEffect(() => {
        let sub;
        (async () => {
            try {
                const { getSession, onAuthStateChange } = await import('./lib/auth');
                const initial = await getSession();
                setSession(initial);
                setAuthChecked(true);
                sub = onAuthStateChange((s) => {
                    setSession(s);
                    if (!s) {
                        // User signed out — reset state
                        setLoading(true);
                        setOnboarded(false);
                        setTransactions([]);
                        setBusiness(DEFAULT_BUSINESS);
                        setInventory([]);
                        setCategories(DEFAULT_CATEGORIES);
                        setWallets(DEFAULT_WALLETS);
                        setInvoices([]);
                        setPage("dashboard");
                    }
                });
            } catch (err) {
                console.error('Auth initialization failed:', err);
                setAuthChecked(true); // Still show login screen, not infinite spinner
            }
        })();
        return () => { if (sub) sub.unsubscribe(); };
    }, []);

    // ─── Load data from Supabase after auth ──────────────────────────────
    useEffect(() => {
        if (!session) return;
        let cancelled = false;
        async function load() {
            try {
                const { loadBusinessConfig, loadCategories, loadWallets, loadTransactions, loadInventory, seedDefaultsForUser } = await import('./lib/db');
                // Seed defaults for new users
                await seedDefaultsForUser(session.user.id);
                const [bizData, catsData, walletsData, txData, invData] = await Promise.all([
                    loadBusinessConfig(),
                    loadCategories(),
                    loadWallets(),
                    loadTransactions(),
                    loadInventory(),
                ]);
                if (cancelled) return;
                if (bizData) {
                    setBusiness(prev => ({ ...prev, ...bizData }));
                    if (bizData.name && bizData.name.trim() !== '') setOnboarded(true);
                }
                if (catsData && (catsData.income.length > 0 || catsData.expense.length > 0)) {
                    setCategories(catsData);
                }
                if (walletsData && walletsData.length > 0) setWallets(walletsData);
                if (txData) setTransactions(txData);
                if (invData) setInventory(invData);
            } catch (err) {
                console.error('Failed to load from Supabase:', err);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }
        setLoading(true);
        load();
        return () => { cancelled = true; };
    }, [session]);

    // ─── Persist helpers ─────────────────────────────────────────────────
    const saveBiz = useCallback(async (updated) => {
        setBusiness(updated);
        const { saveBusinessConfig } = await import('./lib/db');
        saveBusinessConfig(updated);
    }, []);

    const handleAddTx = useCallback(async (tx) => {
        setTransactions(prev => [tx, ...prev]);
        const { addTransaction } = await import('./lib/db');
        const saved = await addTransaction(tx);
        if (saved) setTransactions(prev => prev.map(t => t.id === tx.id ? saved : t));
    }, []);

    const handleUpdateTx = useCallback(async (updated) => {
        setTransactions(prev => prev.map(t => t.id === updated.id ? updated : t));
        const { updateTransaction } = await import('./lib/db');
        updateTransaction(updated);
    }, []);

    const handleDeleteTx = useCallback(async (id) => {
        setTransactions(prev => prev.filter(t => t.id !== id));
        const { deleteTransaction } = await import('./lib/db');
        deleteTransaction(id);
    }, []);

    // Navigation handler — supports optional filter payload
    const handleNavigate = (targetPage, opts) => {
        if (opts?.riskFilter) {
            setTxRiskFilter(opts.riskFilter);
        } else {
            setTxRiskFilter(null);
        }
        setPage(targetPage);
    };

    const handleOnboard = async (data) => {
        const annEst = data.revenue_tier === "under_500m" ? 400000000 : data.revenue_tier === "500m_3b" ? 600000000 : 4000000000;
        const updated = { ...DEFAULT_BUSINESS, ...data, annual_revenue_estimate: annEst };
        setBusiness(updated);
        setOnboarded(true);
        addToast({ type: "success", title: "Chào mừng bạn đến HKD Tax!", detail: `${data.name} — cấu hình thành công`, duration: 5000 });
        const { saveBusinessConfig } = await import('./lib/db');
        saveBusinessConfig(updated);
    };

    // ─── Auth gate ────────────────────────────────────────────────────────
    if (!authChecked) return (<><style>{STYLES}</style><div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "var(--bg)" }}><div style={{ textAlign: "center" }}><div style={{ width: 40, height: 40, border: "3px solid var(--border)", borderTopColor: "var(--accent)", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px" }} /><div style={{ color: "var(--text-secondary)", fontSize: ".9rem" }}>Đang khởi tạo...</div></div></div></>);
    if (!session) return (<LoginScreen />);
    if (loading) return (<><style>{STYLES}</style><div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "var(--bg)" }}><div style={{ textAlign: "center" }}><div style={{ width: 40, height: 40, border: "3px solid var(--border)", borderTopColor: "var(--accent)", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px" }} /><div style={{ color: "var(--text-secondary)", fontSize: ".9rem" }}>Đang tải dữ liệu...</div></div></div></>);
    if (!onboarded) return (<><style>{STYLES}</style><Onboarding onComplete={handleOnboard} /></>);

    return (<><style>{STYLES}</style><div className="app-shell">
        <Sidebar activePage={page} onNavigate={handleNavigate} business={business} riskCount={riskFlags.length} unreconciledCount={unrec} />
        <main className="main-content">
            {page === "dashboard" && <Dashboard transactions={transactions} business={business} onAddTx={() => setShowAddTx(true)} onNavigate={handleNavigate} />}
            {page === "transactions" && <TransactionList transactions={transactions} onAddTx={() => setShowAddTx(true)} onUpdateTx={handleUpdateTx} onDeleteTx={handleDeleteTx} wallets={wallets} categories={categories} addToast={addToast} riskFilter={txRiskFilter} onClearRiskFilter={() => setTxRiskFilter(null)} />}
            {page === "inventory" && <InventoryPage inventory={inventory} setInventory={setInventory} business={business} addToast={addToast} />}
            {page === "reconcile" && <ReconcilePage transactions={transactions} setTransactions={setTransactions} bankEntries={MOCK_BANK_ENTRIES} addToast={addToast} wallets={wallets} categories={categories} business={business} />}
            {page === "tax" && <TaxPreview transactions={transactions} business={business} addToast={addToast} inventory={inventory} categories={categories} />}
            {page === "risk" && <RiskAudit transactions={transactions} onNavigate={handleNavigate} addToast={addToast} business={business} />}
            {page === "invoice" && <InvoicePage business={business} setBusiness={saveBiz} addToast={addToast} transactions={transactions} setTransactions={setTransactions} categories={categories} wallets={wallets} invoices={invoices} setInvoices={setInvoices} />}
            {page === "setup" && <SetupPage categories={categories} setCategories={setCategories} wallets={wallets} setWallets={setWallets} addToast={addToast} transactions={transactions} inventory={inventory} business={business} setTransactions={setTransactions} setInventory={setInventory} setBusiness={saveBiz} invoices={invoices} setInvoices={setInvoices} />}
            {page === "settings" && <SettingsPage business={business} onUpdate={saveBiz} addToast={addToast} />}
            {page === "cashbook" && <CashBookPage transactions={transactions} business={business} addToast={addToast} wallets={wallets} />}
            {page === "taxcalendar" && <TaxCalendarPage business={business} addToast={addToast} />}
            {page === "support" && <SupportPage addToast={addToast} />}
        </main>
        <MobileNav activePage={page} onNavigate={handleNavigate} riskCount={riskFlags.length} unreconciledCount={unrec} business={business} />
        {page !== "dashboard" && page !== "settings" && page !== "inventory" && page !== "setup" && <button className="fab" onClick={() => setShowAddTx(true)} title="Thêm thu/chi">+</button>}
        {showAddTx && <AddTransactionModal onClose={() => setShowAddTx(false)} onSave={handleAddTx} transactions={transactions} addToast={addToast} business={business} categories={categories} wallets={wallets} />}
        <ToastContainer toasts={toasts} />
    </div></>);
}
