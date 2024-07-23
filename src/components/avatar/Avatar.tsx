import classes from './avatar.module.css'

interface AvatarProps {
  user: any
  imageStyles?: React.CSSProperties
}

export function Avatar({user, imageStyles = {}}: AvatarProps) {
  return (
    <img
      src={user?.profile_img_url || ''}
      alt="avatar"
      className={classes.avatarImg}
      style={{
        ...imageStyles,
      }}
    />
  )
}
