const http = require('http');

async function request(url, options = {}) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const reqOptions = {
      hostname: parsed.hostname,
      port: parsed.port,
      path: parsed.pathname + parsed.search,
      method: options.method || 'GET',
      headers: options.headers || {},
    };

    const req = http.request(reqOptions, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const json = data ? JSON.parse(data) : {};
          resolve({ status: res.statusCode, data: json, text: data });
        } catch {
          resolve({ status: res.statusCode, text: data });
        }
      });
    });

    req.on('error', reject);
    if (options.body) {
      req.write(typeof options.body === 'string' ? options.body : JSON.stringify(options.body));
    }
    req.end();
  });
}

async function runTests() {
  console.log('🚀 Starting Automated Workflow Verification for PES MCOE Students\' Council Portal...\n');
  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`✅ PASS: ${message}`);
      passed++;
    } else {
      console.error(`❌ FAIL: ${message}`);
      failed++;
    }
  }

  try {
    // 1. Check Site Settings
    console.log('--- 1. Testing Site Settings & Broadcast Channels ---');
    const settingsRes = await request('http://localhost:3000/api/settings');
    assert(settingsRes.status === 200, 'Settings API responds with 200');
    const settings = settingsRes.data.data;
    assert(settings?.whatsappChannelUrl?.includes('whatsapp'), `WhatsApp Channel URL present: ${settings?.whatsappChannelUrl}`);
    assert(settings?.instagramHandle === '@pesmcoe_studentscouncil', `Instagram Handle present: ${settings?.instagramHandle}`);

    // 2. Check Events API
    console.log('\n--- 2. Testing Events API ---');
    const eventsRes = await request('http://localhost:3000/api/events');
    assert(eventsRes.status === 200, 'Events API responds with 200');
    const events = eventsRes.data.data;
    assert(Array.isArray(events) && events.length >= 4, `Fetched ${events?.length} events with complete details`);
    const mpulse = events.find(e => e.slug?.toLowerCase().includes('pulse') || e.title?.toLowerCase().includes('pulse'));
    assert(!!mpulse, `Flagship fest M-Pulse 2027 found: "${mpulse?.title}" (${mpulse?.eventDate})`);

    // 3. Check Council Members API
    console.log('\n--- 3. Testing Council Hierarchy & Members API ---');
    const membersRes = await request('http://localhost:3000/api/council-members');
    assert(membersRes.status === 200, 'Council Members API responds with 200');
    const members = membersRes.data.data;
    assert(Array.isArray(members) && members.length >= 20, `Council team directory has ${members?.length} office bearers across all wings & 9 DRs`);
    const webOps = members.find(m => m.designation?.toLowerCase().includes('website'));
    assert(!!webOps, `Secretary of Website Operations present: "${webOps?.name}" (${webOps?.designation})`);

    // 4. Check Clubs & Chapters API
    console.log('\n--- 4. Testing Clubs & Chapters API ---');
    const clubsRes = await request('http://localhost:3000/api/clubs');
    assert(clubsRes.status === 200, 'Clubs API responds with 200');
    const clubs = clubsRes.data.data;
    assert(Array.isArray(clubs) && clubs.some(c => c.name.includes('CoDE')), 'Departmental club (CoDE Club AI&DS) is registered');

    // 5. Check Notices API
    console.log('\n--- 5. Testing Notices API ---');
    const noticesRes = await request('http://localhost:3000/api/notices');
    assert(noticesRes.status === 200, 'Notices API responds with 200');
    const notices = noticesRes.data.data;
    assert(Array.isArray(notices) && notices.length >= 4, `Digital notice board contains ${notices?.length} official circulars`);

    // 6. Test 100% Anonymous Query Submission (Zero PII)
    console.log('\n--- 6. Testing 100% Anonymous Student Portal (Zero-PII) ---');
    const anonSubmitRes = await request('http://localhost:3000/api/anonymous-queries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        category: 'Infrastructure / Classroom / Lab / Wi-Fi Issue',
        departmentScope: 'Artificial Intelligence & Data Science (AI & DS)',
        urgency: 'MEDIUM',
        subject: 'Lab 304 GPU Workstations need CUDA update for Hack-AI 2027',
        description: 'The AI/DS lab workstations on the 3rd floor need CUDA toolkit 12.4 updated for the upcoming national hackathon.',
        allowPublicDisplay: true,
      },
    });

    assert(anonSubmitRes.status === 201, 'Anonymous query successfully created without collecting PII');
    const query = anonSubmitRes.data.data;
    const token = query?.trackingToken;
    const queryId = query?.id;
    assert(!!token && token.startsWith('ANON-MCOE-'), `Generated Cryptographic Tracking Token: ${token}`);

    // 7. Test Student Anonymous Token Status Tracker
    console.log('\n--- 7. Testing Anonymous Token Lookup by Student ---');
    const tokenLookupRes = await request(`http://localhost:3000/api/anonymous-queries?token=${token}`);
    assert(tokenLookupRes.status === 200, 'Student can lookup query using only their Anonymous Token');
    assert(tokenLookupRes.data.data?.status === 'SUBMITTED', 'Initial query status is SUBMITTED');
    assert(tokenLookupRes.data.data?.subject.includes('Lab 304'), 'Query subject matched correctly');

    // 8. Test Admin Auth
    console.log('\n--- 8. Testing Council Admin Auth ---');
    const loginRes = await request('http://localhost:3000/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { username: 'admin', password: 'mcoe@council2026' },
    });
    assert(loginRes.status === 200 && loginRes.data.success, 'Council Admin authentication successful');

    // 9. Admin Updates & Resolves Anonymous Query
    console.log('\n--- 9. Admin Reviews & Resolves Anonymous Query ---');
    const adminUpdateRes = await request('http://localhost:3000/api/anonymous-queries', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: {
        id: queryId,
        status: 'RESOLVED',
        officialCouncilResponse: 'The System Administrator and Lab in-charge have updated CUDA toolkit and drivers on all 40 systems in Lab 304 on 06 Oct. All systems are verified for Hack-AI 2027.',
        isPubliclyPublished: true,
        isReviewed: true,
      },
    });
    assert(adminUpdateRes.status === 200, 'Admin can update status and write official council response note');

    // 10. Student checks token again and sees the official Council response!
    console.log('\n--- 10. Student checks token again to see Council Resolution ---');
    const tokenLookupAfterRes = await request(`http://localhost:3000/api/anonymous-queries?token=${token}`);
    assert(tokenLookupAfterRes.data.data?.status === 'RESOLVED', 'Query status updated to RESOLVED');
    assert(tokenLookupAfterRes.data.data?.officialCouncilResponse?.includes('System Administrator'), 'Student can view the official Council resolution note');
    console.log(`💬 Official Response Viewed by Student:\n"${tokenLookupAfterRes.data.data?.officialCouncilResponse}"`);

    // 11. Test Event Registration Form
    console.log('\n--- 11. Testing Event Registration Form ---');
    const regRes = await request('http://localhost:3000/api/event-registrations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        eventId: mpulse?.id || 'evt_mpulse_2027',
        studentName: 'Aarav Deshmukh',
        collegeName: 'PES Modern College of Engineering, Pune',
        department: 'Computer Engineering',
        academicYear: 'TE',
        prn: '72210452K',
        phone: '+91 98230 45678',
        email: 'aarav.deshmukh@mcoe.pes.edu',
        teamName: 'ByteForce MCOE',
        teamSize: 4,
        notes: 'Participating in Code-Storm competitive track.',
      },
    });
    assert(regRes.status === 201, 'Event registration submitted successfully');
    const reg = regRes.data.data;
    assert(!!reg?.referenceNumber, `Generated Registration Ref ID: ${reg?.referenceNumber}`);

    // 12. Test Identified Student Voice Proposal
    console.log('\n--- 12. Testing Identified Student Voice Proposal ---');
    const voiceRes = await request('http://localhost:3000/api/student-voice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        category: 'WORKSHOP_PROPOSAL',
        studentName: 'Pooja Patil',
        department: 'Information Technology (IT)',
        academicYear: 'BE',
        email: 'pooja.patil@mcoe.pes.edu',
        phone: '+91 94220 11223',
        subject: 'Proposal for Hands-on Cloud Native Workshop by Alumni',
        message: 'We have 2 MCOE alumni working at AWS who are willing to conduct a weekend hands-on Kubernetes workshop for SE and TE students.',
      },
    });
    assert(voiceRes.status === 201, 'Student Voice proposal submitted successfully');
    const voice = voiceRes.data.data;
    assert(!!voice?.referenceNumber, `Generated Student Voice Ref ID: ${voice?.referenceNumber}`);

    // 13. Test Sponsorship Enquiry
    console.log('\n--- 13. Testing Sponsorship & Collaboration Enquiry ---');
    const sponRes = await request('http://localhost:3000/api/sponsorships', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        organizationName: 'Persistent Systems Ltd.',
        contactPerson: 'Vikram Joshi',
        email: 'partnerships@persistent.com',
        phone: '+91 98220 99887',
        partnershipType: 'EVENT_CO_SPONSOR',
        message: 'Interested in sponsoring the flagship technical hackathon Hack-AI 2027 and offering pre-placement interviews to finalists.',
      },
    });
    assert(sponRes.status === 201, 'Sponsorship enquiry submitted successfully');
    const spon = sponRes.data.data;
    assert(!!spon?.referenceNumber, `Generated Sponsorship Ref ID: ${spon?.referenceNumber}`);

    // 14. Test Admin KPI Stats
    console.log('\n--- 14. Testing Admin Dashboard KPI Stats ---');
    const statsRes = await request('http://localhost:3000/api/admin/stats');
    assert(statsRes.status === 200, 'Admin Stats API responds with 200');
    console.log('📊 Current Live Council Metrics:', JSON.stringify(statsRes.data.data, null, 2));

    console.log(`\n========================================`);
    console.log(`🎉 TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
    console.log(`========================================\n`);

    if (failed > 0) process.exit(1);
  } catch (err) {
    console.error('Fatal Error during test execution:', err);
    process.exit(1);
  }
}

runTests();
