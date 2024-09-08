export default function getStatus(status: string) {
  switch (status) {
    case 'Pending':
      return 'pending'
    case 'Cancelled':
      return 'cancelled'
    case 'Declined':
      return 'declined'
    case 'Pending second approval':
      return 'pending_second_approval'
    case 'Approved':
      return 'approved'
    default:
      console.warn(`Unknown status: ${status}`)
      return 'unknown'
  }
}
