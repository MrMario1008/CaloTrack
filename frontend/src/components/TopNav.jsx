function TopNav({ mobileMenuOpen, onToggleMenu, onEditProfile, userName }) {
  return (
    <nav className="bg-primary text-white px-4 sm:px-6 lg:px-8 py-4 shadow-md">
      <div className="mx-auto flex flex-wrap items-center justify-between gap-3 max-w-7xl">
        <h1 className="text-xl sm:text-2xl font-bold tracking-wide">CaloTrack</h1>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 p-2 text-white hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white md:hidden"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
          onClick={onToggleMenu}
        >
          <span className="sr-only">Toggle menu</span>
          <span className="block h-0.5 w-5 bg-white" />
          <span className="block h-0.5 w-5 bg-white mt-1" />
          <span className="block h-0.5 w-5 bg-white mt-1" />
        </button>
        <div className={`${mobileMenuOpen ? 'block' : 'hidden'} w-full mt-3 md:mt-0 md:w-auto md:flex md:flex-row md:items-center md:justify-end`}>
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
            <button className="w-full rounded-xl bg-white/10 px-4 py-2 text-left text-sm hover:text-tertiary transition-colors md:w-auto">Dashboard</button>
            <button className="w-full rounded-xl bg-white/10 px-4 py-2 text-left text-sm hover:text-tertiary transition-colors md:w-auto">Food Log</button>
            <button className="w-full rounded-xl bg-white/10 px-4 py-2 text-left text-sm hover:text-tertiary transition-colors md:w-auto">Progress</button>
            <button
              className="w-full rounded-full bg-white px-4 py-2 text-sm font-semibold text-primary shadow-sm hover:bg-gray-100 transition md:w-auto"
              onClick={onEditProfile}
            >
              Edit profile
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default TopNav;
