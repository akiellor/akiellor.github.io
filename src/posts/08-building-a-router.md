<meta name="tags" content="networking,iptables" />

# Building a router

I've been thinking about building a wifi extension device for my apartment because the wifi doesn't quite get from one end to the other. I really have very little to no networking knowledge so wanted to dig into how routing actually works before hand.

This blog will go into how I experimented with VirtualBox to build a virtual router to bridge between two networks.

## The Setup

Internet

Laptop (OSX)

Router (Alpine Linux)
  * eth0 host-only
  * eth1 (VirtualBox Private Network)

Isolated (Alpine Linux)
  * eth0 (VirtualBox Private Network)

## Router

Alpine Linux has a neat little frontend for iptables called awall. There was a sample configuration which all but worked for me [here](http://wiki.alpinelinux.org/wiki/How-To_Alpine_Wall#Example_firewall_using_AWall).

```bash
$ cat > /etc/network/interfaces <<EOS
auto lo
iface lo inet loopback

auto eth0
iface eth0 inet dhcp

hostname router

auto eth1
iface eth1 inet static
  address 192.168.1.1
  netmask 255.255.255.0

EOS
$ apk add --update awall
$ modprobe ip_tables
$ modprobe iptable_nat
$ echo 1 > /proc/sys/net/ipv4/ip_forward
$ /etc/init.d/networking restart
```

```javascript
// /etc/awall/optional/router.json
{
  "description": "Home firewall",

  "zone": {
    "inet": { "iface": "eth0" },
    "loc": { "iface": "eth1" }
  },

  "policy": [
    { "in": "_fw", "action": "accept" },
    { "in": "loc", "out": "inet", "action": "accept" }
  ],

  "snat": [
    { "out": "inet" }
  ]
}
```

```bash
$ awall enable router #enable the policy
$ awall activate #create and update the iptables rules
````

## Isolated
The isolated VM doesn't know anything about our router, so we have to fix that. The `ip route` subcommand can be used to manipulate the [route table](https://en.wikipedia.org/wiki/Routing_table), which is basically a list of rules which paths to different machines on the network.


```bash
$ cat > /etc/network/interfaces <<EOS
auto lo
iface lo inet loopback

auto eth0
iface eth0 inet static
  address 192.168.1.2
  netmask 255.255.255.0
  gateway 192.168.1.1

EOS
$ /etc/init.d/networking restart
```
