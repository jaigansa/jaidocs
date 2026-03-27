+++
title = "Shortcodes"
date = 2025-02-10
draft = false
author = "jaiganesh"
featured_image = ""
summary = ""
+++

hugo shortcodes

## Details

{{< details summary="See the details" >}}
This is a **bold** word.
{{< /details >}}

## Figure

{{< figure
  src="/images/examples/zion-national-park.jpg"
  alt="A photograph of Zion National Park"
  link="https://www.nps.gov/zion/index.htm"
  caption="Zion National Park"
  class="ma0 w-75"
>}}



## highlight

{{< highlight go "linenos=inline, hl_Lines=3 6-8, style=emacs" >}}
package main

import "fmt"

func main() {
    for i := 0; i < 3; i++ {
        fmt.Println("Value of i:", i)
    }
}
{{< /highlight >}}



## Instagram

{{< instagram CkfXhZGvTwU >}}

## QR

{{< qr targetDir="/images/qrcodes" text="https://gohugo.io" />}}

{{< qr targetDir="/images/qrcodes" text="tel:+12065550101" />}}

### qr vcard

{{< qr targetDir="/images/qrcodes" level="low" scale=2 alt="QR code of vCard for John Smith" >}}
BEGIN:VCARD
VERSION:2.1
N;CHARSET=UTF-8:Smith;John;R.;Dr.;PhD
FN;CHARSET=UTF-8:Dr. John R. Smith, PhD.
ORG;CHARSET=UTF-8:ABC Widgets
TITLE;CHARSET=UTF-8:Vice President Engineering
TEL;TYPE=WORK:+12065550101
EMAIL;TYPE=WORK:jsmith@example.org
END:VCARD
{{< /qr >}}


## youtube

{{< youtube 0RKpf3rK57I >}}

## icons

{{< icon name="github">}}