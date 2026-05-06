/* ── per-page caption data ──────────────────────────────────────────────────
   High Performance MySQL, 4th Edition — Silvia Botros & Jeremy Tinley
   figs[i] = caption for the (i+1)-th .diagram-wrap on that page
   tbls[i] = caption for the (i+1)-th .comparison-table               */
var CAPS = {
  'ch01.html': {
    figs: [
      'MySQL logical architecture — connection layer, query layer, storage engine layer',
      'Read/Write lock interaction matrix — shared vs exclusive',
      'Transaction isolation levels and dirty/phantom read visibility',
      'MVCC — snapshot isolation via undo log versioning',
      'InnoDB file layout — tablespace, redo log, doublewrite buffer'
    ],
    tbls: ['Transaction isolation levels compared']
  },
  'ch02.html': {
    figs: [
      'SLI → SLO → SLA hierarchy',
      'Four golden signals — latency, traffic, errors, saturation',
      'Query latency distribution — p50/p95/p99 percentile histogram',
      'Proactive vs reactive monitoring feedback loop'
    ],
    tbls: ['Monitoring tool comparison — Prometheus, PMM, Datadog, CloudWatch']
  },
  'ch03.html': {
    figs: [
      'Performance Schema architecture — instruments, consumers, tables',
      'Consumer hierarchy — global → thread → statement → stage',
      'Statement digest pipeline — parse → normalize → hash → aggregate',
      'Memory instrument tracking — current vs high-water mark'
    ],
    tbls: ['Key Performance Schema tables and their purpose']
  },
  'ch04.html': {
    figs: [
      'MySQL performance bottleneck layers — CPU, memory, disk, network',
      'RAID levels 0/1/5/10 — data layout and failure tolerance',
      'SSD vs HDD I/O latency profile — sequential vs random access',
      'CPU NUMA topology and memory locality for MySQL'
    ],
    tbls: ['Storage options compared — local NVMe, SAN, cloud EBS']
  },
  'ch05.html': {
    figs: [
      'InnoDB buffer pool — LRU list, flush list, free list',
      'InnoDB redo log ring buffer — checkpoint and write position',
      'InnoDB tablespace structure — system, file-per-table, undo',
      'Thread cache and connection pool sizing'
    ],
    tbls: ['Critical InnoDB configuration variables and recommended values']
  },
  'ch06.html': {
    figs: [
      'Data type storage sizes — INT/BIGINT/DECIMAL/VARCHAR/TEXT',
      'Schema anti-patterns — too many columns, EAV, polymorphic keys',
      'Schema migration pipeline — ghost, pt-online-schema-change flow',
      'JSON column vs normalized relational schema trade-offs'
    ],
    tbls: ['MySQL data types — storage, range, and use-case guide']
  },
  'ch07.html': {
    figs: [
      'B-tree index structure — root, branch, leaf pages',
      'Clustered vs secondary index — InnoDB primary key clustering',
      'Covering index — index-only scan eliminates table lookup',
      'Index selectivity and prefix index cardinality',
      'Multicolumn index column-order decision tree'
    ],
    tbls: ['Index types compared — B-tree, hash, full-text, spatial']
  },
  'ch08.html': {
    figs: [
      'Query execution pipeline — parse → optimize → execute → return',
      'EXPLAIN output anatomy — type, key, rows, Extra columns',
      'JOIN algorithm — nested loop, hash join, index merge',
      'Query optimizer cost model — index dive vs statistics estimate',
      'Slow query log analysis workflow'
    ],
    tbls: ['EXPLAIN type values from best to worst']
  },
  'ch09.html': {
    figs: [
      'MySQL replication flow — binlog → relay log → apply',
      'Replication formats — statement-based, row-based, mixed',
      'GTID replication — global transaction identifier lifecycle',
      'Replication topologies — active/passive, active/read-pool, chain',
      'Replication lag measurement and mitigation'
    ],
    tbls: ['Replication topology trade-offs']
  },
  'ch10.html': {
    figs: [
      'Backup types — logical vs physical, online vs offline',
      'Point-in-time recovery using binlog + base backup',
      'Percona XtraBackup — hot backup mechanism with redo log tail',
      'Backup validation pipeline — restore → checksum → smoke test'
    ],
    tbls: ['Backup tool comparison — mysqldump, mydumper, XtraBackup, MEB']
  },
  'ch11.html': {
    figs: [
      'Read vs write workload scaling strategies',
      'Read pool with load balancer — ProxySQL routing rules',
      'Functional sharding — vertical decomposition by service domain',
      'Horizontal sharding — consistent hash ring, shard routing',
      'Vitess architecture — VTGate, VTTablet, topology service'
    ],
    tbls: ['Scaling pattern decision matrix — read pool, sharding, Vitess']
  },
  'ch12.html': {
    figs: [
      'Amazon Aurora — shared distributed storage, write quorum',
      'Aurora vs standard MySQL replication architecture',
      'GCP Cloud SQL — managed topology with automatic failover',
      'Self-hosted MySQL on VMs — machine type and disk selection'
    ],
    tbls: ['Managed MySQL cloud offerings compared — Aurora, Cloud SQL, RDS']
  },
  'ch13.html': {
    figs: [
      'Compliance control layers — access, encryption, audit, backup',
      'Secrets management flow — Vault, KMS, rotation lifecycle',
      'Role-based access control model for MySQL',
      'Audit log pipeline — filter → capture → export → SIEM'
    ],
    tbls: ['Compliance frameworks and MySQL control requirements']
  }
};

(function () {
  /* Active sidebar link */
  var file = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('#sidebar a.sb-ch, nav.sidebar a.sb-ch').forEach(function (a) {
    if ((a.getAttribute('href') || '').split('/').pop() === file)
      a.classList.add('active');
  });

  /* Auto-number figures */
  var pageCaps = CAPS[file] || { figs: [], tbls: [] };
  var figIdx = 0;
  document.querySelectorAll('.diagram-wrap').forEach(function (wrap) {
    var n = ++figIdx;
    var desc = wrap.dataset.caption || (pageCaps.figs[n - 1] || '');
    var p = document.createElement('p');
    p.className = 'diagram-caption';
    var num = document.createElement('span');
    num.className = 'cap-num';
    num.textContent = 'Fig ' + n + (desc ? ':' : '');
    p.appendChild(num);
    if (desc) p.appendChild(document.createTextNode(' ' + desc));
    wrap.appendChild(p);
  });

  /* Auto-number tables */
  var tblIdx = 0;
  document.querySelectorAll('.comparison-table').forEach(function (table) {
    var n = ++tblIdx;
    var desc = pageCaps.tbls[n - 1] || '';
    var cap = table.querySelector('caption');
    if (!cap) { cap = document.createElement('caption'); table.insertBefore(cap, table.firstChild); }
    var num = document.createElement('span');
    num.className = 'cap-num';
    num.textContent = 'Table ' + n + (desc ? ':' : '');
    cap.innerHTML = '';
    cap.appendChild(num);
    if (desc) cap.appendChild(document.createTextNode(' ' + desc));
  });
})();
