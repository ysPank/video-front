/**
 * Handle warning before closing window,
 * defauld message will be displayed
 * @returns {Function} Cleanup function
 */
export const handleBlockUnload = () => {
  window.onbeforeunload = () => 'Are you sure you want to leave?';

  return () => window.onbeforeunload = null;
}
