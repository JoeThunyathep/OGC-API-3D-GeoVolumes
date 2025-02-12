# OGC-API-3D-GeoVolumes

This is the NodeJS implementation of the 3D GeoVolumes server – an open source project that implements the OGC API standards for handling and distributing 3D geospatial data. The project is designed to seamlessly manage 3D city models and geospatial volumes for interoperability with various geospatial tools.

![image](https://github.com/user-attachments/assets/05e6975b-d90a-4030-bd8b-971cc04c19e2)

## Features

- **OGC API 3D GeoVolumes:** Serves 3D geospatial data in compliance with OGC standards.
- **Flexible Responses:** Offers both HTML rendering through EJS templates and raw JSON responses.
- **RESTful Endpoints:** Provides multiple endpoints for the landing page, conformance declaration, collections summary, and collection details.
- **Logging:** Integrated logging through Winston provides detailed logs for debugging and monitoring.
- **Static Content Serving:** Easily serves static assets such as images and stylesheets.
- **Modular Architecture:** Cleanly separated routes, views, and configuration for easier extension and maintenance.

## Requirements

- Node.js (v12 or later) / Ensure that Node.js is installed on your machine.  
  [Download Node.js](https://nodejs.org/)
- (or Docker)

## Installation and Run with NodeJS

1. **Clone the Repository:**

   ```bash
   git clone <repository-url>
   cd ogc-api-3d-geovolumes
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```
## Installation and Run with Docker
Alternatively, you can run the application inside a Docker container:

1. **Build the Docker image:**

    ```bash
    docker build -t ogcapi-3d-geovolumes .
    ```

2. **Run the Docker container:**

    ```bash
    docker run -p 3000:3000 ogcapi-3d-geovolumes
    ```

This will start the app inside a container, mapping port 3000 of the host to port 3000 of the container.

## API Endpoints

## Configuration

The project settings can be adjusted in the `config.json` file located at the root of the repository. An example configuration:

```json
{
"host_url": "http://localhost:3000"
}
```

This value is used to dynamically generate links within the application.

## Running the Server

To start the server, run:

```bash
node server.js
```

By default, the server listens on port 3000. You can view the landing page at [http://localhost:3000](http://localhost:3000) and access the GeoVolumes service at [http://localhost:3000/ogc_api_geovolumes](http://localhost:3000/ogc_api_geovolumes).

## API Endpoints

- **Landing Page:** `/`
  - Displays the landing page with navigation links.
- **GeoVolumes Landing:** `/ogc_api_geovolumes`
  - Renders a landing page or provides a JSON response when requested (e.g., using `?f=json`).
- **Conformance:** `/ogc_api_geovolumes/conformance`
  - Returns a JSON document indicating compliance with the OGC API standards.
- **Collections:** `/ogc_api_geovolumes/collections`
  - Lists data collections either as a rendered HTML view or as JSON.
- **Collection by ID:** `/ogc_api_geovolumes/collections/:collectionsId`
  - Returns detailed JSON data for a specific collection based on its identifier.

## Add Your First Collection for Your 3D Container

To publish your own 3D geospatial container collection, you can add a new entry to the `collections.json` file located at:

```
ogc_api_geovolumes/collections/collections.json
```

Follow the template of the existing collection (e.g., `Stuttgart-Example-Collections`) by copying an existing block and modifying the appropriate fields:

- **id**: A unique identifier for your collection (e.g., `"Your-City-Collection"`).
- **title**: A short, descriptive title for your collection.
- **description**: A brief description of what your 3D container represents.
- **collectiontype**: Typically remains `"3d-container"` for these types of collections.
- **extent**: Define the spatial extent. Update the bounding box coordinates and the Coordinate Reference System (CRS) if needed.
- **links**: Update the URLs that reference your collection, including self-references and links to actual data (e.g., 3D Tiles, gltf, etc.).
- **children** and **content**: Optionally, add nested elements or detailed resource references for your collection.

After editing and saving the file, reload your NodeJS server to apply the changes. If your server is already running, simply restart it:

```bash
node server.js
```

Your new collection will now appear alongside the existing ones.

## Project Structure

```
.
├── config.json                  # Application configuration settings
├── server.js                    # Main Express server entry point
├── package.json                 # Project metadata and dependencies
├── LICENSE                      # Apache License 2.0
├── README.md                    # This documentation file
├── static/                      # Static assets such as images and CSS
├── views/                       # EJS templates for HTML rendering
│   ├── ogc_api/                # Base templates and partials for landing and footer
│   └── geovolumes/             # Templates specific to the GeoVolumes service
└── routes/                      # Express route handlers
    └── ogc_api_geovolumes.js    # Routes for the 3D GeoVolumes API endpoints
```

## Contributing

Contributions are very welcome! If you have ideas for improvements or new features, please:

- Open an issue or submit a pull request.
- Follow the existing coding style.
- Add tests when applicable.

## License

This project is licensed under the [Apache License 2.0](LICENSE). Please review the LICENSE file for further details.

## Citation

If you use this project in your research, please cite the related publication:

DOI: http://doi.org/10.24407/KXP:1796036099

```
@inproceedings{santhanavanich2022digital,
  title={Digital 3D City Models Towards Urban Data Platform using OGC 3D GeoVolumes API},
  author={Santhanavanich, Thunyathep and Wuerstle, Patrick and Padsala, Rushikesh and Coors, Volker},
  booktitle={42. Wissenschaftlich-Technische Jahrestagung der DGPF, 5.-6. Oktober 2022 in Dresden},
  number={30},
  pages={237--242},
  year={2022},
  organization={Gesch{\"a}ftsstelle der DGPF}
}
```

## Contact

Developed by **Thunyathep Santhanavanich (Joe)**. If you encounter any issues or have questions, please contact via [LinkedIn](https://www.linkedin.com/in/thunyatheps/)
