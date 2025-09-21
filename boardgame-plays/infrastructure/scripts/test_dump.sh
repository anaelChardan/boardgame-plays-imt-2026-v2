#!/bin/bash

start_time=$(date +%s.%N)  # Start time with nanosecond precision
echo "🚀🚀🚀🚀🚀🚀🚀🚀 Dumping database for tests ..."

# Get the container name from the first argument or default to "toto"
container=${1:-${CONTAINER_TO_DUMP:-"boardava-pgsql"}}

# Get the script's directory path
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

# Set the path for the backup file
mkdir -p ${SCRIPT_DIR}/../dataset
FILE="${SCRIPT_DIR}/../dataset/backup_structure.sql"

echo ".... Pulling testcontainers/ryuk:0.5.1"
docker pull testcontainers/ryuk:0.5.1

echo ".... Using container ${container}"

echo ".... Dumping structure..."

docker exec -e PGPASSWORD=boardava ${container} pg_dump -U boardava boardava -s  --no-owner > $FILE

echo ".... Dumping data..."
docker exec -e PGPASSWORD=hyperline ${container} pg_dump -U boardava boardava --data-only --table='_prisma_migrations' --no-owner | sed '/^SET/d' | sed '/^SELECT/d' >> $FILE

if [ "${SHUTDOWN_CONTAINER_AFTER_DUMP}" == "true" ]; then
  echo ".... Shuting down container ${container} to save CPU and memory"
  docker stop ${container}
fi

end_time=$(date +%s.%N)  # End time with nanosecond precision
elapsed_time=$(echo "($end_time - $start_time) * 1000" | bc)

echo "Database dumped in ${elapsed_time} ms 🚀🚀🚀🚀🚀🚀🚀 "
