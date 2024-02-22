import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function HowItWorksSection() {
  return (
    <Box sx={{ padding: '24px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <Typography variant="h5" gutterBottom>
        How It Works:
      </Typography>
      <Typography paragraph>
        <strong>Upload and Discover:</strong> Simply upload your photos, and let our advanced AI technology analyze them to pinpoint the precise location each memory was made. Whether it's a cozy café in Paris, a serene beach in Bali, or a bustling street in Tokyo, GeoSnap brings your past adventures to the forefront.
      </Typography>
      <Typography paragraph>
        <strong>Store and Organize:</strong> GeoSnap not only identifies the location of your photos but also organizes them into an interactive digital album. This album is your personal space to revisit and manage your memories, with each photo meticulously cataloged by location and date.
      </Typography>
      <Typography paragraph>
        <strong>Visualize on a World Map:</strong> Experience the ultimate visual journey with our World Map feature. Each pinpointed location transforms into a vibrant marker on the map, allowing you to see the breadth of your travels at a glance. This interactive map serves as your personal global footprint, showcasing the places you've been and the experiences you've cherished.
      </Typography>
      <Typography paragraph>
        <strong>Privacy and Security:</strong> We prioritize your privacy and the security of your memories. With state-of-the-art encryption and privacy controls, your photos remain exclusively yours. 
      </Typography>
    </Box>
  );
}

export default HowItWorksSection;
