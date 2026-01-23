const app = document.getElementById('app');

// Keep the list order consistent between the grid view and the detail view.
// Otherwise the "index" you click (from the sorted grid) won’t match the
// report you open (from the unsorted stockData).
let sortedReports = [];

function init() {
  renderList();
}

function renderList() {
  // Build and store the sorted view used by both list + detail.
  sortedReports = [...stockData].sort(
    (a, b) => new Date(b.run_metadata.run_date) - new Date(a.run_metadata.run_date)
  );

  let html = `
        <header>
  		<h1>Stockfile</h1>
  		<div class="subtitle">Connecting global events with market implications</div>
  		<a href="about.html" class="about-link" style="display:block; margin-top:10px; color:var(--text-muted);">About Stockfile</a>
	</header>
        <div class="report-grid">
    `;

  sortedReports.forEach((report, index) => {
    html += `
            <div class="report-card" onclick="renderDetail(${index})">
                <span class="card-date">${report.run_metadata.run_date}</span>
                <span class="card-theme">${report.run_metadata.article_theme}</span>
                <h2 class="card-title">${report.run_metadata.article_hypothesis}</h2>
            </div>
        `;
  });

  html += `</div>`;
  app.innerHTML = html;
}

function renderDetail(index) {
  // If someone loads the page directly into a detail state in the future,
  // ensure sortedReports exists.
  if (!sortedReports.length) {
    sortedReports = [...stockData].sort(
      (a, b) => new Date(b.run_metadata.run_date) - new Date(a.run_metadata.run_date)
    );
  }

  const report = sortedReports[index];
  const topPickIndex = report.model_output.top_pick_index;
  const topStock = report.model_output.ideas[topPickIndex];
  const runnersUp = report.model_output.ideas.filter((_, i) => i !== topPickIndex);

  let html = `
        <div class="detail-view">
            <div class="nav-bar">
                <button class="back-btn" onclick="renderList()">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                    Back to Reports
                </button>
            </div>

            <div class="detail-header">
                <h1 class="detail-title">${report.run_metadata.article_hypothesis}</h1>
                <div class="detail-meta">
                    ${report.run_metadata.run_date} • ${report.run_metadata.article_theme}
                </div>
            </div>

            <div class="top-stock-section">
                <span class="section-label">High Confidence Top Pick</span>
                <div class="top-stock-card">
                    <div class="top-stock-highlight"></div>
                    <div class="stock-header">
                        <div class="stock-name">${topStock.official_stock_name}</div>
                        <div class="stock-direction ${topStock.direction === 'Up' ? 'direction-up' : 'direction-down'}">
                            ${topStock.direction}
                        </div>
                    </div>
                    <div class="stock-body">
                        <div class="stock-explanation">
                            ${topStock.why}
                        </div>
                        <div class="stock-confidence">
                            <span class="confidence-label">Confidence</span>
                            <span class="confidence-value">${topStock.confidence}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="runners-up-section">
                 <span class="section-label">Other Opportunities</span>
                 <div class="runners-up-grid">
                    ${runnersUp
                      .map(
                        (stock) => `
                        <div class="stock-card-small">
                            <div class="small-stock-header">
                                <div class="small-stock-name">${stock.official_stock_name}</div>
                                <div class="stock-direction ${stock.direction === 'Up' ? 'direction-up' : 'direction-down'}" style="font-size: 0.75rem; padding: 4px 8px;">
                                    ${stock.direction}
                                </div>
                            </div>
                            <div class="small-stock-why">${stock.why}</div>
                             <div class="stock-confidence" style="align-items: flex-start; text-align: left;">
                                <span class="confidence-label" style="font-size: 0.65rem;">Confidence: <span style="color: var(--text-main); font-weight: 600;">${stock.confidence}</span></span>
                            </div>
                        </div>
                    `
                      )
                      .join('')}
                 </div>
            </div>

            <div class="assumptions-section">
                <span class="section-label" style="margin-bottom: 20px; display: block;">Key Market Assumptions</span>
                <ul class="assumption-list">
                    ${report.model_output.key_assumptions
                      .map((assumption) => `<li class="assumption-item">${assumption}</li>`)
                      .join('')}
                </ul>
            </div>
        </div>
    `;

  app.innerHTML = html;
  window.scrollTo(0, 0);
}

// Start the app
init();
