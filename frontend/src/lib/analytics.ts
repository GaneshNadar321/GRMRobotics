declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: any) => void;
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && GA_TRACKING_ID) {
    window.gtag('config', GA_TRACKING_ID, {
      page_location: url,
    });
  }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && GA_TRACKING_ID) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// E-commerce events
export const purchase = (transactionId: string, value: number, items: any[]) => {
  if (typeof window !== 'undefined' && GA_TRACKING_ID) {
    window.gtag('event', 'purchase', {
      transaction_id: transactionId,
      value: value,
      currency: 'INR',
      items: items,
    });
  }
};

export const addToCart = (itemId: string, itemName: string, value: number) => {
  if (typeof window !== 'undefined' && GA_TRACKING_ID) {
    window.gtag('event', 'add_to_cart', {
      currency: 'INR',
      value: value,
      items: [
        {
          item_id: itemId,
          item_name: itemName,
          currency: 'INR',
          value: value,
        },
      ],
    });
  }
};

export const viewItem = (itemId: string, itemName: string, category: string, value: number) => {
  if (typeof window !== 'undefined' && GA_TRACKING_ID) {
    window.gtag('event', 'view_item', {
      currency: 'INR',
      value: value,
      items: [
        {
          item_id: itemId,
          item_name: itemName,
          item_category: category,
          currency: 'INR',
          value: value,
        },
      ],
    });
  }
};