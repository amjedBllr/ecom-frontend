const AdminQA = () => {
  const faqs = [
    {
      question: "How do I add a new product to the marketplace?",
      answer:
        'To add a new product to the marketplace, follow these steps:\n\n1. Log in to your admin dashboard.\n2. Navigate to the "Products" section.\n3. Click on the "Add Product" button.\n4. Fill in the required details such as product name, description, price, and category.\n5. Upload product images.\n6. Save the product details.',
    },
    {
      question: "How can I manage orders?",
      answer:
        'You can manage orders from the "Orders" section in your admin dashboard. Here, you can view and update the status of orders, process refunds, and communicate with customers regarding their orders.',
    },
    {
      question: "How do I update my website's branding and styling?",
      answer:
        "To update your website's branding and styling, you can modify the Tailwind CSS configuration files. The main configuration file is typically located at `tailwind.config.js`. Here, you can customize the color palette, font families, and other design aspects to match your branding.",
    },
    {
      question: "How can I add or remove product categories?",
      answer:
        'You can add or remove product categories from the "Categories" section in your admin dashboard. To add a new category, click on the "Add Category" button and provide the necessary details. To remove a category, simply select the category and click the "Delete" button.',
    },
    // Add more FAQs as needed
  ];

  return (
    <div className="container mx-auto padding-x py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Q&A</h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-md">
            <h2 className="text-lg font-semibold mb-2">{faq.question}</h2>
            <p className="text-gray-700 whitespace-pre-line">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminQA;
