/* ── per-page caption data ──────────────────────────────────────
   figs[i] = caption for the (i+1)-th .diagram-wrap on that page
   tbls[i] = caption for the (i+1)-th .comparison-table          */
var CAPS = {
  'ch01.html': {
    figs: [
      'Three pillars of data systems — Reliability, Scalability, Maintainability',
      'Response-time percentile histogram (p50 / p95 / p99 / p999)',
      'Fault vs failure — a fault in a component leads to a system failure',
      'Twitter fan-out — pull-on-read vs push-on-write approaches',
      'Vertical scaling vs horizontal scaling (shared-nothing)'
    ],
    tbls: [
      'Reliability, Scalability, Maintainability compared'
    ]
  },
  'ch02.html': {
    figs: [
      'Three data models — Relational, Document, Graph',
      'Résumé encoded in relational tables vs JSON document',
      'Property graph — nodes, edges, and their properties'
    ],
    tbls: [
      'Relational vs Document model trade-offs',
      'Query language comparison — SQL, Cypher, SPARQL, Datalog'
    ]
  },
  'ch03.html': {
    figs: [
      'LSM-Tree write path (MemTable → SSTable) and read path with bloom filters',
      'B-Tree three-level structure with leaf pages and WAL',
      'OLTP vs OLAP — access patterns and data volumes compared',
      'Star schema — fact_sales table joined to four dimension tables'
    ],
    tbls: [
      'B-Tree vs LSM-Tree — write amplification, read performance, space use'
    ]
  },
  'ch04.html': {
    figs: [
      'Forward and backward compatibility — 2×2 compatibility matrix',
      'Encoding size comparison — JSON, Thrift, Protobuf, Avro (binary)',
      'Avro schema resolution — writer schema matched to reader schema',
      'Three dataflow modes — through databases, services (REST/RPC), message queues'
    ],
    tbls: []
  },
  'ch05.html': {
    figs: [
      'Leader-follower replication with synchronous and asynchronous followers',
      'Replication lag anomalies — read-your-writes, monotonic reads, consistent prefix',
      'Multi-leader topologies — all-to-all, star, circular',
      'Leaderless quorum diagram — n=5 nodes, w=3 write quorum, r=3 read quorum'
    ],
    tbls: [
      'Replication strategies compared — single-leader, multi-leader, leaderless'
    ]
  },
  'ch06.html': {
    figs: [
      'Single-node bottleneck vs data partitioned across three nodes',
      'Range partitioning vs hash partitioning — trade-offs and hot-spot risks',
      'Consistent hash ring — nodes and keys distributed on a circular hash space',
      'Document-partitioned (local) index vs term-partitioned (global) index',
      'Rebalancing strategies — hash-mod-N (bad), fixed partitions, dynamic splits',
      'Request routing — contact any node, dedicated routing tier, client-aware',
      'Partitioning combined with replication — leaders and followers per partition'
    ],
    tbls: [
      'Document-partitioned vs term-partitioned secondary index trade-offs'
    ]
  },
  'ch07.html': {
    figs: [
      'ACID — Atomicity, Consistency, Isolation, Durability explained',
      'Isolation level ladder — Read Uncommitted → Serializable with anomalies',
      'MVCC — multiple row versions, snapshot visibility, and garbage collection',
      'Serializability implementations — actual serial execution, 2PL, and SSI'
    ],
    tbls: [
      'Race condition taxonomy — dirty read, lost update, write skew, phantom'
    ]
  },
  'ch08.html': {
    figs: [
      'Network failure modes — request lost, receiver crashed, or reply lost',
      'Network latency distribution — fast path and long tail at p99/p999',
      'Clock drift between nodes — time-of-day vs monotonic clock',
      'Process pause and fencing tokens — protecting against zombie leaders',
      'Byzantine fault model spectrum — crash-fail, crash-recovery, Byzantine',
      'System models compared — synchronous, partially synchronous, asynchronous'
    ],
    tbls: [
      'Dangerous clock usage patterns and safer alternatives',
      'System model comparison — network, clocks, process faults, use cases'
    ]
  },
  'ch09.html': {
    figs: [
      'Consistency guarantee spectrum — eventual → session → causal → linearizable',
      'Linearizability — non-linearizable vs linearizable execution examples',
      'CAP theorem — Venn diagram of Consistency, Availability, Partition tolerance',
      'Lamport timestamps — causal ordering across Node A and Node B',
      'Two-phase commit (2PC) — prepare phase and commit phase',
      'Raft consensus — leader broadcasts AppendEntries to followers, quorum commit'
    ],
    tbls: [
      'Linearizability use cases — when it is and is not required',
      'Consensus algorithms compared — 2PC, Paxos, Raft, Zab'
    ]
  },
  'ch10.html': {
    figs: [
      'Three kinds of systems — services (online), batch (offline), stream (near-RT)',
      'Unix pipeline as batch processing ancestor — awk | sort | uniq | head',
      'MapReduce — input splits, mappers, shuffle & sort, reducers, HDFS output',
      'Sort-merge join (reduce-side) vs broadcast hash join (map-side)',
      'MapReduce chained jobs vs Spark DAG pipelined in memory'
    ],
    tbls: [
      'Batch processing frameworks compared — MapReduce, Spark, Flink, Hive'
    ]
  },
  'ch11.html': {
    figs: [
      'Messaging system types — direct messaging, message broker, log-based broker',
      'Kafka — partitions, offsets, and multiple independent consumer groups',
      'Mutable state vs event sourcing (immutable event log)',
      'Event time vs processing time — late events and watermarks',
      'Window types — tumbling, sliding, session windows, and stream-table join',
      'Flink checkpointing — Chandy-Lamport barriers flowing through the DAG'
    ],
    tbls: [
      'Fault tolerance guarantees — at-most-once, at-least-once, exactly-once'
    ]
  },
  'ch12.html': {
    figs: [
      'Lambda architecture (batch + speed layers) vs Kappa architecture (stream-only)',
      'Unbundled database — event log as integration backbone with derived stores',
      'End-to-end idempotency — double payment problem and idempotency key solution',
      'Dataflow — one write fans out to email, search, fraud, analytics consumers',
      'Ethics — risks of data systems and engineering responsibilities',
      'Book-wide synthesis — Part I Foundations, Part II Distribution, Part III Derived'
    ],
    tbls: [
      'Lambda vs Kappa architecture trade-offs'
    ]
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
