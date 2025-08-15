interface LoadingProps {
  size?: number
  color?: string
}

function Loading({ size = 40, color = '#007bff' }: LoadingProps) {
  return (
    <div className="loading-container">
      <div 
        className="loading-spinner"
        style={{
          width: size,
          height: size,
          borderColor: `${color}20`, 
          borderTopColor: color
        }}
      ></div>
    </div>
  )
}

export default Loading