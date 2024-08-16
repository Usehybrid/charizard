export default function getStatus(status: string) {
  switch (status) {
    case 'Pending':
      return 'pending'
    case 'Cancelled':
      return 'cancelled'
    case 'Declined':
      return 'declined'
    case 'Pending 2nd Approver':
      return 'pending_second_approver'
    case 'Approved':
      return 'approved'
    default:
      return 'pending'
  }
}
