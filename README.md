# clinical-algorithms
Platform for creating and consulting clinical algorithms

---

### Backend image build
`docker build -t clinical-algorithms-api .`

Or

`yarn docker:build`

---

### Frontend image build
`docker compose -f docker-compose.yml -f docker-compose.build.yml build`

Or

`yarn docker:build`
