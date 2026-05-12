document.getElementById('sync-btn').addEventListener('click', async () => {
    const username = document.getElementById('username').value.trim();
    const status = document.getElementById('message');
    const SHARED_SECRET = "my_simple_bridge_password"; // Match this on the server

    try {
        status.innerText = "⏳ Fetching LeetCode Data...";
        
        const lcRes = await fetch("https://leetcode.com/api/problems/all/");
        const lcData = await lcRes.json();
        
        const solved = lcData.stat_status_pairs
            .filter(p => p.status === 'ac')
            .map(p => ({
                problemId: `LC_${p.stat.question_id}`,
                title: p.stat.question__title,
                titleSlug: p.stat.question__title_slug,
                difficulty: p.difficulty.level
            }));

        status.innerText = "🚀 Pushing to Dashboard...";

        const pushRes = await fetch('http://localhost:3000/api/leetcode/sync-complete', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'x-bridge-secret': SHARED_SECRET // Simple custom header
            },
            body: JSON.stringify({ 
                username: username.toLowerCase(), 
                problems: solved
            })
        });

        if (pushRes.ok) {
            status.innerText = "✅ Sync Complete!";
        } else {
            status.innerText = "❌ Push Failed.";
        }
    } catch (err) {
        status.innerText = "❌ " + err.message;
    }
});