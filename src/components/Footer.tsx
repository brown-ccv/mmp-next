export const Footer = () => {
  const today = new Date()
  return (
      <footer className="pt-36 pb-16">
        &copy; {today.getFullYear()} Mesoamerican Migration Project.
      </footer>
  )
}
