from django.test import AsyncClient
from django.test import TestCase

class BoardConsumerTestCase(TestCase):
    def setUp(self):
        self.async_client = AsyncClient()

    async def test_boardChannelCommunication(self):
        response = await self.async_client.post("")