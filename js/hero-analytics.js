(() => {
  const token = document.currentScript.dataset.mixpanelToken;
  const mixpanel = window.mixpanel;
  if (!token || !mixpanel) return;

  const params = new URLSearchParams(window.location.search);
  const visit = { surface: 'hero' };
  for (const name of ['utm_source', 'utm_medium', 'utm_campaign']) {
    const value = params.get(name)?.trim();
    if (value) visit[name] = value;
  }

  try {
    mixpanel.init(token, {
      autocapture: false,
      track_pageview: false,
      track_marketing: false,
      skip_first_touch_marketing: true,
      store_google: false,
      save_referrer: false,
      persistence: 'localStorage',
      cross_subdomain_cookie: false,
      property_blacklist: ['$current_url'],
    });
  } catch {
    return;
  }

  function track(event, properties) {
    try {
      mixpanel.track(event, properties, {
        transport: 'sendBeacon',
        send_immediately: true,
      });
    } catch {
      // Tracking is optional and must never interrupt navigation.
    }
  }

  track('hero_viewed', visit);

  function trackTrialClick(event) {
    if (event.type === 'auxclick' && event.button !== 1) return;
    const cta = event.target.closest('[data-trial-cta]');
    if (cta) {
      track('hero_trial_clicked', { ...visit, cta_location: cta.dataset.trialCta });
    }
  }

  document.addEventListener('click', trackTrialClick);
  document.addEventListener('auxclick', trackTrialClick);
})();
