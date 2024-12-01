export default function Footer() {
    return (
      <footer className="bg-gray-100 mt-8">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <p className="text-gray-600">NextCommerce is your one-stop shop for all your needs.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-gray-800">Contact Us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-800">FAQs</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-800">Shipping</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-800">Returns</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-gray-800">Facebook</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-800">Twitter</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-800">Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-8 text-center">
            <p className="text-gray-600">&copy; 2023 NextCommerce. All rights reserved.</p>
          </div>
        </div>
      </footer>
    )
  }
  
  