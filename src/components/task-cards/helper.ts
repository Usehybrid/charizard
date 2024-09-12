export enum TASK_STATUS {
  PENDING = 'pending',
  PENDING_SECOND_APPROVER = 'pending_second_approver',
  PENDING_CANCELLATION = 'pending_cancellation',
  APPROVED = 'approved',
  CLOSED = 'closed',
  DECLINED = 'declined',
  CANCELLED = 'cancelled',
}

export default function getStatus(status: string) {
  switch (status) {
    case TASK_STATUS.PENDING:
      return 'Pending'
    case TASK_STATUS.PENDING_SECOND_APPROVER:
      return 'Pending second approver'
    case TASK_STATUS.PENDING_CANCELLATION:
      return 'Pending Cancellation'
    case TASK_STATUS.CLOSED:
      return 'Closed'
    case TASK_STATUS.CANCELLED:
      return 'Cancelled'
    case TASK_STATUS.DECLINED:
      return 'Declined'
    case TASK_STATUS.APPROVED:
      return 'Approved'
    default:
      console.warn(`Unknown status: ${status}`)
      return 'Unknown'
  }
}
