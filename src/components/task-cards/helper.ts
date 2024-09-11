export enum TASK_STATUS_OPEN {
  APPROVED = 'approved',
  DECLINED = 'declined',
  PENDING = 'pending',
  CANCELLED = 'cancelled',
  PENDING_SECOND_APPROVER = 'pending_second_approved',
  PENDING_CANCELLATION = 'pending_cancellation',
  REJECTED = 'rejected',
}

export default function getStatus(status: string) {
  switch (status) {
    case TASK_STATUS_OPEN.PENDING:
      return 'Pending'
    case TASK_STATUS_OPEN.CANCELLED:
      return 'Cancelled'
    case TASK_STATUS_OPEN.DECLINED:
      return 'declined'
    case TASK_STATUS_OPEN.PENDING_SECOND_APPROVER:
      return 'Pending second approval'
    case TASK_STATUS_OPEN.APPROVED:
      return 'Approved'
    case TASK_STATUS_OPEN.REJECTED:
      return 'Rejected'
    default:
      console.warn(`Unknown status: ${status}`)
      return 'unknown'
  }
}
