# Searching-with-Logger

This program allows user to search for a book or author and all the search entries are stored in a log file. This model is containerized using Docker and deployed on AWS.

The title and authors of books are extracted from the online Gutenberg library (available at: http://www.gutenberg.org/wiki/Gutenberg:Offline_Catalogs). The extracted data is in the form of files. While extracting data from each file a 5 minute delay is introduced. The extracted data and the time of extraction are stored in MongoDB database hosted on AWS beforehand.

When user searches for a book or author, their search query is stored in a log file. A user can add notes to a particular book and when they search for the same book again then that note is also fetched for them. All the data is sent in JSON format.

For more information, read the documents available in the Docs folder.

I have used NodeJS for backend, React for frontend, Docker for containerizing, AWS for hosting, and Python for writing the extraction and data-loading scripts.
