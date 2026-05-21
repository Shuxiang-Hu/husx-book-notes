/* ── per-page caption data ──────────────────────────────────────
   figs[i] = caption for the (i+1)-th .diagram-wrap on that page
   tbls[i] = caption for the (i+1)-th .comparison-table          */
var CAPS = {
  'index.html': { figs: [], tbls: [] },
  'ch01.html': {
    figs: [
      'Internet nuts-and-bolts — hosts, access routers, core routers, and the links between them',
      'Circuit switching vs packet switching — reserved slots vs store-and-forward independent packets',
      'Four sources of nodal delay — processing, queuing, transmission, and propagation',
      'Protocol layer stack — Application, Transport, Network, Link, Physical with encapsulation'
    ],
    tbls: ['Circuit switching vs packet switching — resource allocation, bandwidth, congestion, efficiency']
  },
  'ch02.html': {
    figs: [
      'Client-server vs P2P architectures — centralized server vs direct peer communication',
      'HTTP non-persistent vs persistent — timing diagrams showing 2-RTT vs 1-RTT overhead per object',
      'DNS hierarchy — root, TLD, authoritative servers with iterative query flow',
      'CDN architecture — origin server distributes content to regional clusters via DNS redirection'
    ],
    tbls: ['Application-layer protocols — HTTP, SMTP, DNS, BitTorrent compared by purpose, transport, port']
  },
  'ch03.html': {
    figs: [
      'GBN vs Selective Repeat sliding windows — sender window, lost packets, and TCP segment format',
      'TCP three-way handshake — SYN, SYN-ACK, ACK with sequence numbers and connection establishment',
      'TCP AIMD congestion window evolution — slow start, congestion avoidance sawtooth pattern'
    ],
    tbls: ['UDP vs TCP — connection setup, reliability, congestion control, flow control, header overhead']
  },
  'ch04.html': {
    figs: [
      'Router internal architecture — input ports, crossbar switching fabric, output ports, routing processor',
      'IP addressing, subnets, and NAT — ISP block, CIDR subnets, private-to-public NAT translation',
      'SDN separation of planes — centralized controller installs OpenFlow flow tables in packet switches'
    ],
    tbls: ['IPv4 vs IPv6 — address size, header size, checksum, fragmentation, flow label, address config']
  },
  'ch05.html': {
    figs: [
      "Dijkstra's algorithm on a 6-node network graph — LS routing table computation from source u",
      'BGP inter-AS routing — eBGP between AS border routers, iBGP within AS to distribute routes',
      'ICMP traceroute — probes with incrementing TTL reveal each hop via Time Exceeded replies'
    ],
    tbls: ['Link-State vs Distance-Vector vs Path-Vector — algorithm, convergence, scalability, policy, scope']
  },
  'ch06.html': {
    figs: [
      'CSMA/CD collision detection — Node A and B collide, jam signal sent, binary exponential backoff',
      'Ethernet frame format and ARP resolution — frame fields, ARP broadcast and unicast reply',
      'Data center fat-tree (folded Clos) topology — core, aggregation, and ToR switch layers'
    ],
    tbls: ['Multiple access protocols — TDMA, ALOHA, CSMA/CD, CSMA/CA, Token Ring compared']
  },
  'ch07.html': {
    figs: [
      'IEEE 802.11 BSS architecture and CSMA/CA timing — AP, stations, DIFS backoff, data, SIFS, ACK',
      '4G LTE network architecture — UE, eNodeB, EPC (MME, S-GW, P-GW), and Internet connectivity',
      '4G handover — X2 interface between source and target eNodeB, MME updates data path'
    ],
    tbls: ['WiFi (802.11ax) vs 4G LTE vs 5G NR — coverage, throughput, latency, access, mobility']
  },
  'ch08.html': {
    figs: [
      'Symmetric vs public key cryptography — shared K_s vs K+/K- key pairs for encryption',
      'Digital signature — Alice signs H(m) with K-, Bob verifies with K+_Alice',
      'Firewall and DMZ architecture — outer firewall, DMZ servers, inner firewall, internal LAN'
    ],
    tbls: ['Security mechanisms — AES, RSA, HMAC, digital signatures, TLS 1.3, IPsec, firewall compared']
  }
};

(function () {
  /* ── active sidebar link ─────────────────────────────────── */
  var file = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('#sidebar a.sb-ch, nav.sidebar a.sb-ch').forEach(function (a) {
    if ((a.getAttribute('href') || '').split('/').pop() === file)
      a.classList.add('active');
  });

  /* ── auto-number figures ─────────────────────────────────── */
  var pageCaps = CAPS[file] || { figs: [], tbls: [] };
  var figIdx = 0;

  document.querySelectorAll('.diagram-wrap').forEach(function (wrap) {
    var n = ++figIdx;
    var desc = wrap.dataset.caption          /* explicit override on element */
            || (pageCaps.figs[n - 1] || ''); /* lookup table */

    var p = document.createElement('p');
    p.className = 'diagram-caption';

    var num = document.createElement('span');
    num.className = 'cap-num';
    num.textContent = 'Fig ' + n + (desc ? ':' : '');
    p.appendChild(num);

    if (desc) {
      p.appendChild(document.createTextNode(' ' + desc));
    }

    wrap.appendChild(p);
  });

  /* ── auto-number tables ──────────────────────────────────── */
  var tblIdx = 0;

  document.querySelectorAll('.comparison-table').forEach(function (table) {
    var n = ++tblIdx;
    var desc = pageCaps.tbls[n - 1] || '';

    var cap = table.querySelector('caption');
    if (!cap) {
      cap = document.createElement('caption');
      table.insertBefore(cap, table.firstChild);
    }

    var num = document.createElement('span');
    num.className = 'cap-num';
    num.textContent = 'Table ' + n + (desc ? ':' : '');

    cap.innerHTML = '';
    cap.appendChild(num);
    if (desc) cap.appendChild(document.createTextNode(' ' + desc));
  });
})();
